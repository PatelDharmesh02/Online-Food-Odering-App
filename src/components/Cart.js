import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((store) => store.cart?.items);
  const total = useSelector((store) => store.cart?.total);
  return (
    <div key="parent-container" className="flex justify-center items-center">
      <div className="m-4 p-2 bg-slate-200 min-w-[40vw] rounded-lg">
        <h1 className="font-bold text-3xl">Cart</h1>
        <div key="items-container">
            <div key="items">
                
            </div>
            <div key="price">

            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
