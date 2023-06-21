// Fetch Site List by Company ID
const companyIdInput = document.getElementById("companyID");
const companyIdButton = document.getElementById("fetchCompany");

companyIdButton.addEventListener("click", () => {
  const companyId = companyIdInput.value;
  fetchSiteList(companyId);
});

// Fetch Site by ID
const siteIdInput = document.getElementById("siteID");
const siteIdButton = document.getElementById("fetchSite");

siteIdButton.addEventListener("click", () => {
  const siteId = siteIdInput.value;
  fetchSiteByID(siteId);
});

// Environment Actions
const envIdInput = document.getElementById("envID");

const clearCacheButton = document.getElementById("clearCache");
const restartPHPButton = document.getElementById("restartPHP");

clearCacheButton.addEventListener("click", () => {
  const envId = envIdInput.value;
  console.log(`Env: ${envId}`);
  clearKinstaCache(envId);
});

restartPHPButton.addEventListener("click", () => {
  const envId = envIdInput.value;
  console.log(`Env: ${envId}`);
  restartPHP(envId);
});
