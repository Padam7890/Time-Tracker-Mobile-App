export const addTimes = (time1: string, time2: string): string => {
    const [h1, m1, s1] = time1.split(":").map(Number);
    const [h2, m2, s2] = time2.split(":").map(Number);
  
    let seconds = s1 + s2;
    let minutes = m1 + m2 + Math.floor(seconds / 60);
    let hours = h1 + h2 + Math.floor(minutes / 60);
  
    seconds %= 60;
    minutes %= 60;
  
    return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, "0")).join(":");
  };
  
  // Example Usage
  console.log(addTimes("00:20:00", "00:20:30")); // Output: "00:40:30"
  