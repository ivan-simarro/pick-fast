export const whatDoYouNeed = [
    "El pedido no se ha recibido",
    "El pedido recibido es incorrecto",
    "El pedido recibido está dañado",
    "Me han cobrado dos veces el pedido",
    "Me da un error al realizar el pago"
];
const user = sessionStorage.getItem("user");
export const initialMessagesState = ["Hola " + user + ", ¿en qué podemos ayudarte?"];
export const sorryMessage = user + " sentimos mucho tu preocupación. ";

export const notArrived = [
    "El pedido no se ha recibido",
    "El pedido recibido es incorrecto",
    "El pedido recibido está dañado",
    "Me han cobrado dos veces el pedido",
    "Me da un error al realizar el pago",
];

export const firstResponse = {
    0: sorryMessage + "¿Podrías indicarnos a qué pedido te refieres?",
    1: sorryMessage,
    2: sorryMessage,
    3: sorryMessage,
    4: sorryMessage
}

export const lastResponse = {
    0: "No te preocupes " + user + ", ¡tu pedido sigue en plazo de entrega! Muchas gracias por contactar con Pick Fast, seguimos aquí para lo que necesites.",
    1: sorryMessage,
    2: sorryMessage,
    3: sorryMessage,
    4: sorryMessage
}

export const nextMessage = (sentMessage) => {
    switch (sentMessage) {
        case "El pedido no se ha recibido":
            return firstResponse[0];
        case "El pedido recibido es incorrecto":
            return firstResponse[1];
        case "El pedido recibido está dañado":
            return firstResponse[2];
        case "Me han cobrado dos veces el pedido":
            return firstResponse[3];
        case "Me da un error al realizar el pago":
            return firstResponse[4];
    }
}
