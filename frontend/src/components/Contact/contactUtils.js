export const whatDoYouNeed = [
    "El pedido no se ha recibido",
    "Falta un artículo en mi pedido",
    "Un artículo ha llegado dañado",
    "Me han cobrado dos veces el pedido",
    "Me da un error al realizar el pago"
];

export const sorryMessage = (user) => user + " sentimos mucho tu preocupación. ";
const finalMessage = "Muchas gracias por contactar con Pick Fast, seguimos aquí para lo que necesites.";

export const firstResponse = (userToContact, pos) => {
    let sorryMessageToUser = sorryMessage(userToContact);
    switch (pos) {
        case 0: return sorryMessageToUser + "¿Podrías indicarnos a qué pedido te refieres?"
        case 1: return sorryMessageToUser + "¿Podrías indicarnos a qué producto te refieres?"
        case 2: return sorryMessageToUser + "¿Podrías indicarnos a qué producto te refieres?"
        case 3: return sorryMessageToUser + "¿Podrías indicarnos a qué pedido te refieres?"
        case 4: return sorryMessageToUser
    }
}

const lastResponse = (userToContact, pos) => {
    switch (pos) {
        case 0: return "No te preocupes " + userToContact + ", ¡tu pedido sigue en plazo de entrega! " + finalMessage
        case 1: return userToContact + " sentimos mucho los ocurrido. Te será reembolsado el importe del producto de 5 a 7 días hábiles. " + finalMessage
        case 2: return userToContact + " sentimos mucho los ocurrido. Te será reembolsado el importe del producto de 5 a 7 días hábiles. " + finalMessage
        case 3: return userToContact + " sentimos mucho los ocurrido. Te será reembolsado el importe del pedido de 5 a 7 días hábiles. " + finalMessage
        case 4: return " No te preocupes, estamos teniendo un fallo temporal. ¡Vuelve a intentarlo más adelante!"
    }
}

export const nextMessage = (sentMessage, userToContact) => {
    switch (sentMessage) {
        case "El pedido no se ha recibido":
            return firstResponse(userToContact, 0);
        case "Falta un artículo en mi pedido":
            return firstResponse(userToContact, 1);
        case "Un artículo ha llegado dañado":
            return firstResponse(userToContact, 2);
        case "Me han cobrado dos veces el pedido":
            return firstResponse(userToContact, 3);
        case "Me da un error al realizar el pago":
            return firstResponse(userToContact, 4) + lastResponse(userToContact, 4);
        default:
            break;
    }
}


export const finish = (setMessages, messages, index, setFinished, userToContact) => {
    setMessages([...messages, lastResponse(userToContact, index)]);
    sessionStorage.removeItem("message");
    setTimeout(() => {
        setFinished(true);
    }, 4000);
}
