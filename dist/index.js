const{crypto:o}=globalThis;class n extends TypeError{constructor(o,n,t){super(`${o} variable is not of type ${n} (value: '${t}')`),this.code="ERR_INVALID_ARG_TYPE"}}const t=o.getRandomValues.bind(o),e=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102],r=128;let i,a,l,s=0;o.randomUUID||(o.randomUUID=function(o){void 0!==o&&function(o,t){if(null===o||Array.isArray(o)||"object"!=typeof o)throw new n(t,"Object",o)}(o,"options");const{disableEntropyCache:c=!1}={...o};let d;!function(o,t){if("boolean"!=typeof o)throw new n(t,"boolean",o)}(c,"options.disableEntropyCache"),void 0===l&&(l=new Uint8Array(36),l[8]=l[13]=l[18]=l[23]="-".charCodeAt(0),l[14]=52),c?(d=a,void 0===d&&(d=a=new Uint8Array(16)),t(d)):(void 0===i&&(i=new Uint8Array(16*r)),0===s&&t(i),s=(s+1)%r,d=i.slice(16*s,16*s+16)),d[8]=63&d[8]|128;let y=0;return l[0]=e[d[y]>>4],l[1]=e[15&d[y++]],l[2]=e[d[y]>>4],l[3]=e[15&d[y++]],l[4]=e[d[y]>>4],l[5]=e[15&d[y++]],l[6]=e[d[y]>>4],l[7]=e[15&d[y++]],l[9]=e[d[y]>>4],l[10]=e[15&d[y++]],l[11]=e[d[y]>>4],l[12]=e[15&d[y++]],l[15]=e[15&d[y++]],l[16]=e[d[y]>>4],l[17]=e[15&d[y++]],l[19]=e[d[y]>>4],l[20]=e[15&d[y++]],l[21]=e[d[y]>>4],l[22]=e[15&d[y++]],l[24]=e[d[y]>>4],l[25]=e[15&d[y++]],l[26]=e[d[y]>>4],l[27]=e[15&d[y++]],l[28]=e[d[y]>>4],l[29]=e[15&d[y++]],l[30]=e[d[y]>>4],l[31]=e[15&d[y++]],l[32]=e[d[y]>>4],l[33]=e[15&d[y++]],l[34]=e[d[y]>>4],l[35]=e[15&d[y]],String.fromCharCode.apply(null,l)});o.randomUUID.bind(o);
//# sourceMappingURL=index.js.map
