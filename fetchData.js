// Fetch Site List
async function fetchSiteList(companyId) {
  const url = `https://api.kinsta.com/v2/sites?company=${companyId}`;
  const token =
    "3c4d168fa1725fe833d239c5221510445f4b8a5ffbc6cf06cdc742816886c5f7";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(url, config);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

// Fetch Site by ID
async function fetchSiteByID(siteId) {
  const url = `https://api.kinsta.com/v2/sites/${siteId}`;
  const token =
    "3c4d168fa1725fe833d239c5221510445f4b8a5ffbc6cf06cdc742816886c5f7";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(url, config);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}
