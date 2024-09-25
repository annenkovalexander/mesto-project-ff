export const convertCardsData = initialData => {
    return initialData && initialData.cardsData && Array.isArray(initialData.cardsData) ? initialData.cardsData.map(card => 
        ({
            id: card._id || "",
            name: card.name || "",
            link: card.link || "",
            likes: card.likes || [],
            owner: card.owner || {}
        })
    ) : [];
}