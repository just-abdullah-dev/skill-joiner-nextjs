export const getTimeForJob = (t)=>{
    const time = parseInt(t,10);
    if(time > 0 && time < 30){
      return `Within ${t} ${t == 1? 'day':'days'}`;
    }else if(time >= 30 && time < 60){
      const month = parseInt(time/30,10);
      return `Within ${month} ${t == 1? 'month':'months'}`;
    }
  }