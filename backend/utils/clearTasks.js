const clear = async () => {
  for (let i = 0; i < 99999; i++) {
    await fetch(`http://localhost:3000/tasks/${i}`, { method: "DELETE" });
  }
};
clear();
