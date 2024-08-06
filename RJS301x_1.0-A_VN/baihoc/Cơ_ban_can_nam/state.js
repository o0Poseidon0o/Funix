function Counter() {
  // State lưu bộ đếm với biến counter
  // setCounter hàm lưu giá trị cho biến counter
  const [counter, setCounter] = useState(0);
  //Hàm sự kiên cho bộ đếm
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  // Actions-->State-->View-->Actions
  return (
    <div>
      Value:{counter}
      <button onClick={increment}>Increment</button>
    </div>
  );
}
