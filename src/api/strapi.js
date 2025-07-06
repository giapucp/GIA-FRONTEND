
const API_URL = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337/') + 'api';
const BASE_URL = API_URL.replace('/api', '');

// Cache simple
const cache = new Map();

export async function fetchNoticias() {
  try {
    const response = await fetch(`${API_URL}/noticias?populate=*`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const { data } = await response.json();

    return data.map(item => {
      // Para Strapi v5, los datos pueden venir directamente en el item o en attributes
      const attributes = item.attributes || item;
      
      return {
        id: item.id,
        titulo: attributes.titulo || 'Sin título',
        contenido: attributes.contenido || '',
        textoFinal: attributes.textoFinal || '',
        fechaPublicacion: attributes.fechaPublicacion || new Date().toISOString(),
        portada: getImageUrl(attributes.portada),
        categorias: getCategories(attributes.categoria)
      };
    });
  } catch (error) {
    console.error("Error fetching noticias:", error);
    return [];
  }
}

// Función auxiliar mejorada para imágenes
function getImageUrl(portada) {
  // Soporta múltiples formatos de Strapi
  const imageData = portada?.data?.attributes || portada?.attributes || portada;
  
  if (!imageData?.url) return '/placeholder-noticia.jpg';
  
  return imageData.url.startsWith('http')
    ? imageData.url
    : `${BASE_URL}${imageData.url}`;
}

// Función auxiliar mejorada para categorías
function getCategories(categoria) {
  // Soporta múltiples formatos de Strapi
  const categoriasData = categoria?.data || categoria;
  
  if (!Array.isArray(categoriasData)) return [];
  
  return categoriasData.map(cat => ({
    id: cat.id,
    nombre: cat.attributes?.tipo || cat.tipo || 'Sin categoría'
  }));
}
export async function fetchNoticiaById(id) {
  if (cache.has(id)) return cache.get(id);
  
  try {
    const response = await fetch(
      `${API_URL}/noticias/${id}?populate[portada]=*&populate[categoria]=*`
    );
    const { data } = await response.json();
    
    const noticia = {
      id: data.id,
      ...data.attributes,
      portada: getImageUrl(data.attributes.portada?.data?.attributes),
      categorias: getCategories(data.attributes.categoria?.data)
    };
    
    cache.set(id, noticia);
    return noticia;
  } catch (error) {
    console.error(`Error fetching noticia ${id}:`, error);
    return null;
  }
}

/**
 * Obtiene las noticias más recientes (últimas 4 por defecto)
 */
export async function fetchNoticiasRecientes(limit = 4) {
  try {
    const response = await fetch(
      `${API_URL}/noticias?populate=*&sort=fechaPublicacion:desc&pagination[limit]=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    // Transformación directa para la estructura mostrada en los logs
    return data.map(noticia => ({
      id: noticia.id,
      titulo: noticia.titulo || 'Sin título',
      contenido: noticia.contenido || '',
      textoFinal: noticia.textoFinal || '',
      fechaPublicacion: noticia.fechaPublicacion || new Date().toISOString(),
      portada: noticia.portada?.url 
        ? `${BASE_URL}${noticia.portada.url}`
        : '/placeholder-noticia.jpg',
      categorias: noticia.categoria?.map(cat => ({
        id: cat.id,
        nombre: cat.tipo || 'Sin categoría'
      })) || []
    }));
  } catch (error) {
    console.error("Error fetching noticias recientes:", error);
    return [];
  }
}
/**
 * Función alternativa usando el endpoint básico si falla el específico
 */
export async function getNoticiasRecientes(limit = 4) {
  try {
    const allNoticias = await fetchNoticias();
    return allNoticias
      .sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion))
      .slice(0, limit);
  } catch (error) {
    console.error("Error al obtener noticias recientes:", error);
    return [];
  }
}

export async function fetchMiembros(){
  try {
    const response = await fetch(`${API_URL}/miembros?populate=*`);
    const { data } = await response.json();
    return data.map(miembro => ({
      id: miembro.id,
      nombre: miembro.Nombres || 'Sin nombre',
      apellidoPaterno: miembro.ApellidoPaterno || 'Sin apellido',
      foto: getImageUrl(miembro.foto),
      area: miembro.area_gia ? {
        id: miembro.area_gia.id,
        nombre: miembro.area_gia.NombreArea || 'Sin área'
      } : null,
    }));
  } catch (error) {
    console.error("Error fetching miembros:", error);
    return [];
  }
}