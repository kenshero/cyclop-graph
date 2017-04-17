export const mapDocWithVariables = (doc, variables) => {
  const varsFromDocument = getVariblesFromDocument(doc)
  const variablesSet = matchVar(varsFromDocument, variables)
  const infoDoc = replaceVariablestoDoc(doc, variablesSet)
  return infoDoc
}

export const getVariblesFromDocument = (doc) => {
  const regExp = /\(([^)]+)\)/g
  const matches = doc.match(regExp)
  const varsFromDocument = []
  for (let i = 0; i < matches.length; i++) {
    const str = matches[i].substring(1, matches[i].length - 1)
    varsFromDocument.push(str)
  }
  return varsFromDocument
}

export const matchVar = (varsFromDocument, variables) => {
  let newVars
  if (varsFromDocument.length !== variables.length) {
    throw 'Document and Variables does not match.'
  } else if (isMatchVars(varsFromDocument, variables)) {
    newVars = processMapVars(varsFromDocument, variables)
  }
  return newVars
}

export const replaceVariablestoDoc = (doc, variablesSet) => {
  let infoDoc = doc
  const varsFromDocument = getVariblesFromDocument(doc)
  for (let i = 0; i < variablesSet.length; i++) {
    infoDoc = infoDoc.replace(varsFromDocument[i], variablesSet[i])
  }
  return infoDoc
}

export const processMapVars = (varsFromDocument, variables) => {
  const newVars = varsFromDocument.map((varFromDoc, index) => {
    const keys = Object.keys(variables[index])
    let replaceValue = varFromDoc
    for (let i = 0; i < keys.length; i++) {
      const varsToString = JSON.stringify(variables[index][keys[i]])
      replaceValue = replaceValue.replace(`$${keys[i]}`, varsToString)
    }
    return replaceValue
  });
  return newVars;
}

export const isMatchVars = (varsFromDocument, variables) => {
  for (let i = 0; i < varsFromDocument.length; i++) {
    const splitVarsFromDocument = varsFromDocument[i].split(',')
    const vars = Object.keys(variables[i])
    if (splitVarsFromDocument.length !== vars.length) {
      throw new Error('Variable length does not match.')
    }
    for (let n = 0; n < vars.length; n++) {
      const searchWord = findMatchVariable(splitVarsFromDocument[n].trim(), vars[n])
      if (searchWord === -1) {
        throw new Error(`'${vars[n]}' Variable and Document does not match.`)
      }
    }
  }
  return true;
}

export const findMatchVariable = (splitVarsFromDocument, vars) => {
  var regx = new RegExp(vars + '[]?$');
  return splitVarsFromDocument.search(regx);
}
