export const whatDoYouNeed = [
    "El pedido no se ha recibido",
    "Falta un artículo en mi pedido",
    "Un artículo ha llegado dañado",
    "Me han cobrado dos veces el pedido",
    "Me da un error al realizar el pago"
];
const user = sessionStorage.getItem("user");
export const sorryMessage = user + " sentimos mucho tu preocupación. ";
const finalMessage = "Muchas gracias por contactar con Pick Fast, seguimos aquí para lo que necesites.";

export const firstResponse = {
    0: sorryMessage + "¿Podrías indicarnos a qué pedido te refieres?",
    1: sorryMessage + "¿Podrías indicarnos a qué producto te refieres?",
    2: sorryMessage + "¿Podrías indicarnos a qué producto te refieres?",
    3: sorryMessage + "¿Podrías indicarnos a qué pedido te refieres?",
    4: sorryMessage
}
const lastResponse = {
    0: "No te preocupes " + user + ", ¡tu pedido sigue en plazo de entrega! " + finalMessage,
    1: user + " sentimos mucho los ocurrido. Te será reembolsado el importe del producto de 5 a 7 días hábiles. " + finalMessage,
    2: user + " sentimos mucho los ocurrido. Te será reembolsado el importe del producto de 5 a 7 días hábiles. " + finalMessage,
    3: user + " sentimos mucho los ocurrido. Te será reembolsado el importe del pedido de 5 a 7 días hábiles. " + finalMessage,
    4: " No te preocupes, estamos teniendo un fallo temporal. ¡Vuelve a intentarlo más adelante!"
}

export const nextMessage = (sentMessage) => {
    switch (sentMessage) {
        case "El pedido no se ha recibido":
            return firstResponse[0];
        case "Falta un artículo en mi pedido":
            return firstResponse[1];
        case "Un artículo ha llegado dañado":
            return firstResponse[2];
        case "Me han cobrado dos veces el pedido":
            return firstResponse[3];
        case "Me da un error al realizar el pago":
            return firstResponse[4] + lastResponse[4];
        default:
            break;
    }
}


export const finish = (setMessages, messages, index, setFinished) => {
    setMessages([...messages, lastResponse[index]]);
    sessionStorage.removeItem("message");
    setTimeout(() => {
        setFinished(true);
    }, 4000);
}
