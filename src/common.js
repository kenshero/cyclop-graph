export const mapDocWithVariables = (doc, variables) => {
  let varsFromDocument = getVariblesFromDocument(doc);
  let variablesSet = matchVar(varsFromDocument, variables);
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
  if(varsFromDocument.length != variables.length) {
    throw 'Document and Variables does not match.'
  } else if(isMatchVars(varsFromDocument, variables)){
      processMapVars(varsFromDocument, variables)
  }
}

const replaceVariablestoDoc = (doc, variablesSet) => {
  console.log(doc);
  console.log(variablesSet);
}

const processMapVars = (varsFromDocument, variables) => {
  for(let i = 0; i < variables.length; i++){
    console.log(varsFromDocument);
    console.log(variables[i]);
  }
}





function isMatchVars(varsFromDocument, variables) {
  for( let i = 0; i < varsFromDocument.length; i++) {
    const splitVarsFromDocument = varsFromDocument[i].split(",");
    const lengthVars = Object.keys(variables[i]).length;
    if(splitVarsFromDocument.length != lengthVars) {
      throw 'Variable dose not match.'
    }
  }
  return true;
}
