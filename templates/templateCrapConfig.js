const crapConfig = ({ projectName, withTS, withSass, withClass }) => `{
  "project": {
    "projectName": "${projectName}",
    "withTS": ${withTS},
    "withSass": ${withSass},
    "withClass": ${withClass}
  }
}
`;

module.exports = crapConfig;
