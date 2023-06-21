const token =
  "3c4d168fa1725fe833d239c5221510445f4b8a5ffbc6cf06cdc742816886c5f7";

// Fetch Site List
async function fetchSiteList(companyId) {
  const res = await fetch(
    `https://api.kinsta.com/v2/sites?company=${companyId}`,

    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  try {
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Fetch Site by ID
async function fetchSiteByID(siteId) {
  const res = await fetch(
    `https://api.kinsta.com/v2/sites/${siteId}`,

    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  try {
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Clear Kinsta Cache
async function clearKinstaCache(envId) {
  const res = await fetch(`https://api.kinsta.com/v2/sites/tools/clear-cache`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      environment_id: `${envId}`,
    }),
  });

  try {
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Restart PHP
async function restartPHP(envId) {
  const res = await fetch(`https://api.kinsta.com/v2/sites/tools/restart-php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      environment_id: `${envId}`,
    }),
  });

  try {
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
