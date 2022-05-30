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

export function handleProcrationLeft(breedcount) {
  let x = 0;
  if(breedcount === undefined) {
    x = 10;
  } else {
    x = 10 - breedcount;
  }
  return x;
}

export function handleLifeStage(lifestage) {
  let x = "";
  if(lifestage === 0) {
    x = "Embryo";
  } else if(lifestage === 1) {
    x = "Toddler";
  } else if(lifestage === 2) {
    x = "Adult";
  }
  return x;
}

export function handleAncestry(ancestry) {
  let x ="";
  if(ancestry === 1) {
    x = "Lunarian";
  } else if(ancestry === 2) {
    x = "Ochran";
  } else if(ancestry === 3) {
    x = "Glyesian";
  } else if(ancestry === 4) {
    x = "Maarish";
  } else if(ancestry === 5) {
    x = "Khoroth";
  }
  return x;
}

export function handlePersonality(personality) {
  let x = "";
  if(personality === 1) {
    x = "Angry";
  } else if(personality === 2) {
    x = "Curious";
  } else if(personality === 3) {
    x = "Feisty";
  } else if(personality === 4) {
    x = "Nerdy";
  } else if(personality === 5) {
    x = "Polite";
  } else if(personality === 6) {
    x = "Reckless";
  } else if(personality === 7) {
    x = "Resilient";
  } else if(personality === 8) {
    x = "Sassy";
  } else if(personality === 9) {
    x = "Shy";
  } else if(personality === 10) {
    x = "Stoic";
  } else if(personality === 11) {
    x = "Klever";
  } else if(personality === 12) {
    x = "Lavish";
  } else if(personality === 13) {
    x = "Miner";
  } else if(personality === 14) {
    x = "Glitched";
  }
  return x;
}
