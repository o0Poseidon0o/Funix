import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getFromStorage, saveToStorage, userArr } from "./storage";

const initLiveChat = {
  toggle: false,
  animation: false,
};

const initCart = {
  quantity: 1,
  total: null,
  product: null,
  img: null,
  id: null,
  listCart: null,
  count: null,
  totalPrice: null,
};
const initSignUp = {
  name: null,
  password: null,
  email: null,
  phone: null,
  cart: [],
  address: null,
};
const initLogin = {
  password: "",
  email: "",
  onLogin: false,
};
const initChangeImage = { data: null, id: null };
const initSlicePopup = { items: null, toggle: false };
const initSliceShop = {
  data: [],
};

const liveChatSlice = createSlice({
  name: "chat",
  initialState: initLiveChat,
  reducers: {
    loading(state, action) {
      state.toggle = action.payload;
    },
    closeBox(state, action) {
      state.toggle = action.payload;
    },
    animation(state, action) {
      state.animation = action.payload;
    },
  },
});
const cartSlice = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    addToCart(state, actions) {
      state.id = actions.payload.id;
      state.quantity = actions.payload.quantity;
      state.total = actions.payload.total * state.quantity;
      state.product = actions.payload.product;
      state.img = actions.payload.img;
      state.listCart = {
        id: state.id,
        quantity: state.quantity,
        total: state.total,
        product: state.product,
        img: state.img,
      };

      let currentUser = getFromStorage("current");
      const checkedId = (id) => {
        return currentUser[0].cart.findIndex((items) => items.id === id);
      };
      const checkedUser = (user) => {
        return userArr.findIndex((items) => items.email === user);
      };
      // currentUser[0].cart.splice(checkedId(state.listCart.id), 1);

      if (checkedId(state.listCart.id) !== -1) {
        currentUser[0].cart.splice(
          checkedId(state.listCart.id),
          1,
          state.listCart
        );
        state.totalPrice = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        currentUser[0].total = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        let newCart = [
          // ...userArr[checkedUser(currentUser[0].email)].cart,
          ...currentUser[0].cart,
        ];
        saveToStorage("cart", newCart);
        saveToStorage("current", currentUser);
      } else {
        currentUser[0].cart.push(state.listCart);
        currentUser[0].total = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        saveToStorage("cart", currentUser[0].cart);
        saveToStorage("current", currentUser);
      }

      if (checkedUser(currentUser[0].email) !== -1) {
        userArr.splice(checkedUser(currentUser[0].email), 1, currentUser[0]);
        saveToStorage("user", userArr);
      }

      console.log(
        checkedId(state.listCart.id),
        checkedUser(currentUser[0].email)
      );
    },
    increment(state) {
      state.quantity = state.quantity + 1;
    },
    decrement(state) {
      state.quantity = state.quantity - 1;
    },
    defaultQuantity(state) {
      state.quantity = 1;
    },
    loading(state, actions) {
      state.count = actions.payload;
    },
    totalPrice(state, actions) {
      state.totalPrice = actions.payload;
    },
    updateIncrement(state, actions) {
      state.quantity = actions.payload.newQuantity + 1;
      let currentUser = getFromStorage("current");
      const checkedId = (id) => {
        return currentUser[0].cart.findIndex((items) => items.id === id);
      };
      if (checkedId(actions.payload.id) !== -1) {
        let newItems = currentUser[0].cart.filter(
          (items) => items.id === actions.payload.id
        );
        newItems[0].quantity = state.quantity;
        newItems[0].total = actions.payload.price * state.quantity;
        currentUser[0].cart.splice(
          checkedId(actions.payload.id),
          1,
          newItems[0]
        );
        state.totalPrice = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        currentUser[0].total = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        saveToStorage("cart", currentUser[0].cart);
        saveToStorage("current", currentUser);
      }
      const checkedUser = (user) => {
        return userArr.findIndex((items) => items.email === user);
      };
      if (checkedUser(currentUser[0].email) !== -1) {
        userArr.splice(checkedUser(currentUser[0].email), 1, currentUser[0]);
        saveToStorage("user", userArr);
      }
      console.log(state.quantity, checkedId(actions.payload.id));
    },
    updateDecrement(state, actions) {
      let currentUser = getFromStorage("current");
      state.quantity = actions.payload.newQuantity - 1;
      const checkedId = (id) => {
        return currentUser[0].cart.findIndex((items) => items.id === id);
      };
      if (checkedId(actions.payload.id) !== -1) {
        let newItems = currentUser[0].cart.filter(
          (items) => items.id === actions.payload.id
        );
        newItems[0].quantity = state.quantity;
        newItems[0].total = actions.payload.price * state.quantity;
        currentUser[0].cart.splice(
          checkedId(actions.payload.id),
          1,
          newItems[0]
        );
        state.totalPrice = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        currentUser[0].total = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        saveToStorage("cart", currentUser[0].cart);
        saveToStorage("current", currentUser);
      }
      const checkedUser = (user) => {
        return userArr.findIndex((items) => items.email === user);
      };
      if (checkedUser(currentUser[0].email) !== -1) {
        userArr.splice(checkedUser(currentUser[0].email), 1, currentUser[0]);
        saveToStorage("user", userArr);
      }
    },
    deleteCart(state, actions) {
      let currentUser = getFromStorage("current");
      let cartArr = getFromStorage("cart");
      const checkedId = (id) => {
        return cartArr.findIndex((items) => items.id === id);
      };
      console.log(checkedId(actions.payload));
      if (checkedId(actions.payload) !== -1) {
        cartArr.splice(checkedId(actions.payload), 1);
        saveToStorage("cart", cartArr);
        currentUser[0].cart = cartArr;
        state.totalPrice = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        currentUser[0].total = currentUser[0].cart
          .map((items) => items.total)
          .reduce((pre, cur) => pre + cur, 0);
        saveToStorage("current", currentUser);
      }
      const checkedUser = (user) => {
        return userArr.findIndex((items) => items.email === user);
      };
      if (checkedUser(currentUser[0].email) !== -1) {
        userArr.splice(checkedUser(currentUser[0].email), 1, currentUser[0]);
        saveToStorage("user", userArr);
      }
    },
  },
});
const signUpSlice = createSlice({
  name: "signUp",
  initialState: initSignUp,
  reducers: {
    address(state, actions) {
      state.address = actions.payload;
    },
    mail(state, actions) {
      state.email = actions.payload;
    },
    password(state, actions) {
      state.password = actions.payload;
    },
    name(state, actions) {
      state.name = actions.payload;
    },
    phone(state, actions) {
      state.phone = actions.payload;
    },
  },
});
const loginSlice = createSlice({
  name: "login",
  initialState: initLogin,
  reducers: {
    mail(state, actions) {
      state.email = actions.payload;
    },
    password(state, actions) {
      state.password = actions.payload;
    },
    onLogin(state) {
      state.onLogin = true;
    },
    onLogout(state) {
      state.onLogin = false;
    },
    clearPassword(state, actions) {
      state.password = actions.payload;
    },
  },
});
const imageSlice = createSlice({
  name: "image",
  initialState: initChangeImage,
  reducers: {
    defaultImage(state, actions) {
      state.data = null;
      state.id = actions.payload;
    },

    changeImage(state, actions) {
      state.data = actions.payload;
    },
  },
});
const shopSlice = createSlice({
  name: "categories",
  initialState: initSliceShop,
  reducers: {
    allProduct(state, actions) {
      state.data = actions.payload;
      state.isSwitch = true;
    },
  },
});
const popupSlice = createSlice({
  name: "popup",
  initialState: initSlicePopup,
  reducers: {
    showPopup(state, actions) {
      state.toggle = true;
      state.items = actions.payload;
    },
    closePopup(state) {
      state.toggle = false;
      state.items = null;
    },
  },
});

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    categories: shopSlice.reducer,
    image: imageSlice.reducer,
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    cart: cartSlice.reducer,
    chat: liveChatSlice.reducer,
  },
});
export const liveChatAction = liveChatSlice.actions;
export const cartAction = cartSlice.actions;
export const popupAction = popupSlice.actions;
export const categoriesShopAction = shopSlice.actions;
export const changeImageAction = imageSlice.actions;
export const signUpAction = signUpSlice.actions;
export const loginAction = loginSlice.actions;
export default store;
