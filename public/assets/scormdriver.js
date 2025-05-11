// Simple SCORM stub for development
window.API = {
  Initialize: () => true,
  Terminate: () => true,
  SetValue: (key, value) => console.log(`SCORM Set: ${key} = ${value}`),
  Commit: () => true,
};