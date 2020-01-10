const crapConfig = (projectName, withTS, withSass) => `{
  "project": {
    "name": "${projectName}",
    "withTS": ${withTS},
    "withSass": ${withSass}
  }
}
`;

module.exports = crapConfig;
