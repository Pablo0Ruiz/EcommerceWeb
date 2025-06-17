export const getSearch = async (searchParams: URLSearchParams) => {
    try {



        
        const response = await fetch(`/api/auth/product/search?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })



        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`Error en la búsqueda: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error)
        throw error
    }
}