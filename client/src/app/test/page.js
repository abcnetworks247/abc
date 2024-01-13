

const data = [11, 2, 22, 1,1,4];

// const newdata = data.splice(0, 4)

// console.log(data);


const cartdata = [
    {
        id: 1,
        name: "richard",
        category:"men"
    },
    {
        id: 2,
        name: "mijan",
        category:"woemn"
    },
    {
        id: 3,
        name: "igoni",
        category:"electronic"
    },
]
const existingCartItem = cartdata.find((item) =>
  item.id == 3
);

console.log(existingCartItem)