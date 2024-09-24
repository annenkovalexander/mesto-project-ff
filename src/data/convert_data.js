export const convertCardsData = initialData => {
    console.log("convertCardsData initialData: ", initialData);
    return initialData.cardsData.map(card => 
        ({
            id: card._id || "",
            name: card.name || "",
            link: card.link || "",
            likes: card.likes || [],
            owner: card.owner || {}
        })
    );
}