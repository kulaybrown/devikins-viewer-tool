export function handleImgIndexPath(id) {
  let x = 0;
  if(id < 99999) {
    x = 0;
  } 
  else if(id < 199999) {
    x = 1;
  }
  else if(id < 299999) {
    x = 2;
  }
  else if(id < 399999) {
    x = 3;
  }
  else if(id < 499999) {
    x = 4;
  }
  else if(id < 599999) {
    x = 5;
  }
  else if(id < 699999) {
    x = 6;
  }
  else if(id < 799999) {
    x = 7;
  }
  else if(id < 899999) {
    x = 8;
  }
  else if(id < 999999) {
    x = 9;
  }
  else if(id < 1999999) {
    x = 10;
  }
  return x;
}


export function handleRarity(oa) {
  let x = "common";
  if (oa < 30) {
    x = "common";
  } else if (oa < 35) {
    x = "uncommon";
  } else if (oa < 41) {
    x = "rare";
  } else if (oa < 50) {
    x = "mythic";
  } else {
    x = "eldritch";
  }
  return x;
}

export function handleGenes(gene) {
  let x = "dominant";
  if(gene === 0) {
    x = "dominant";
  } else if(gene === 1) {
    x = "co-dominant";
  } else if(gene === 2) {
    x = "recessive";
  } else if(gene === 3) {
    x = "mutated";
  } else if(gene === 4) {
    x = "unique";
  } else {
    x = "bonded";
  }
  return x;
}

export function handleAffinity(aff) {
  let x = "common";
  if(aff < 4) {
    x = "common";
  } else if(aff < 6) {
    x = "uncommon";
  } else if(aff < 8) {
    x = "rare";
  } else if(aff < 10) {
    x = "mythic";
  } else {
    x = "eldritch";
  }
  return x;
}