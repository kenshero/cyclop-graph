export const mapDocWithVariables = (doc, variables) => {
  let varsFromDocument = getVariblesFromDocument(doc);
  let variablesSet = matchVar(varsFromDocument, variables);
  console.log(variablesSet);
  console.log(doc);
  // let infoDoc = replaceVariablestoDoc(doc, variablesSet)
}

const getVariblesFromDocument = (doc) => {
  const regExp = /\(([^)]+)\)/g;
  const matches = doc.match(regExp);
  let varsFromDocument = [];
  for (let i = 0; i < matches.length; i++) {
      let str = matches[i].substring(1, matches[i].length - 1);
      varsFromDocument.push(str);
  }
  return varsFromDocument;
}

const matchVar = (varsFromDocument, variables) => {
  let newVars;
  if(varsFromDocument.length != variables.length) {
    throw 'Document and Variables does not match.'
  } else if(isMatchVars(varsFromDocument, variables)){
      newVars = processMapVars(varsFromDocument, variables)
  }
  return newVars;
}

const replaceVariablestoDoc = (doc, variablesSet) => {
  console.log(doc);
  console.log(variablesSet);
}

const processMapVars = (varsFromDocument, variables) => {
  const newVars = varsFromDocument.map( (varFromDoc, index) => {
    const keys = Object.keys(variables[index]);
    let replaceVar = varFromDoc;
    for(let i = 0; i < keys.length; i++) {
      replaceVar = replaceVar.replace(`$${keys[i]}`, variables[index][keys[i]])
    }
    return replaceVar;
   });
  return newVars;
}





function isMatchVars(varsFromDocument, variables) {
  for( let i = 0; i < varsFromDocument.length; i++) {
    const splitVarsFromDocument = varsFromDocument[i].split(",");
    const vars = Object.keys(variables[i]);
    if(splitVarsFromDocument.length != vars.length) {
      throw 'Variable dose not match.'
    }
    for(let n = 0; n < vars.length; n++) {
      const searchWord = splitVarsFromDocument[n].includes(`$${vars[n]}`)
      if(!searchWord) {
        throw `'${vars[n]}' dose not match.`
      }
    }
  }
  return true;
}
