export default class Dealer {
    constructor(scene) {
        const dealerCards = scene.cardLabels.slice(0);
        this.dealAllCards = (number) => {
            const handCards = [];
            
            while (handCards.length < number) handCards.push(dealerCards.splice(Math.floor(Math.random()*dealerCards.length),1)[0]);

            const minCardX = scene.hand.x - (number/2)*75 + 37.5;
            let index = 0;
            for (const cardSprite of handCards) {
                scene.hand.addCard(minCardX + (index * 75), cardSprite);
                index++;
            }
        }
    }
}