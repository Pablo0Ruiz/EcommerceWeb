export const getSearch = async (searchParams: URLSearchParams) => {
    try {
        console.log('=== FRONTEND SEARCH ===')
        console.log('Parámetros de búsqueda:', searchParams.toString())
        console.log('Parámetros individuales:', Object.fromEntries(searchParams.entries()))
        
        const response = await fetch(`/api/auth/product/search?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log('Response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`Error en la búsqueda: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log('Resultados recibidos:', data.length, 'productos')
        return data
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error)
        throw error
    }
}