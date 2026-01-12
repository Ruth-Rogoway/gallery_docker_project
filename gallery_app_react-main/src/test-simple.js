// Simple test file to check JSX syntax
const TestComponent = () => {
  const items = [1, 2, 3];

  return (
    <div>
      {items.map((item) => (
        <div key={item}>
          Item {item}
        </div>
      ))}
    </div>
  );
};

export default TestComponent;