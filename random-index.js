/* Unbiased cryptographically secure index selection for user-facing random jokes. */
globalThis.JestBoxRandomIndex=function(max){
  if(!Number.isSafeInteger(max)||max<1||max>0x100000000)throw new RangeError("Invalid random index range");
  const range=0x100000000;
  const limit=Math.floor(range/max)*max;
  const values=new Uint32Array(1);
  do{crypto.getRandomValues(values)}while(values[0]>=limit);
  return values[0]%max;
};
