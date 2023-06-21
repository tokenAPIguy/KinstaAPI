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

// Clear Cache
const clearCacheInput = document.getElementById("clearCacheInput");
const clearCacheButton = document.getElementById("clearCache");

clearCacheButton.addEventListener("click", () => {
  const envId = clearCacheInput.value;
  console.log(envId);
  clearKinstaCache(envId);
});

// Restart PHP
const restartPHPInput = document.getElementById("restartPHPInput");
const restartPHPButton = document.getElementById("restartPHP");

restartPHPButton.addEventListener("click", () => {
  const envId = restartPHPInput.value;
  console.log(envId);
  restartPHP(envId);
});
