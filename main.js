// Retrieve DOM elements
const companyIdInput = document.getElementById("companyID");
const companyIdButton = document.getElementById("fetchCompanyID");

const siteIdInput = document.getElementById("siteID");
const siteIdButton = document.getElementById("fetchSiteID");

// Creating Event listeners
companyIdButton.addEventListener("click", () => {
  const companyId = companyIdInput.value;
  fetchSiteList(companyId);
});

siteIdButton.addEventListener("click", () => {
  const siteId = siteIdInput.value;
  fetchSiteByID(siteId);
});
