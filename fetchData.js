export const token = document.getElementById("token");

// Fetch Site List
export async function fetchSiteList(companyId) {
  const res = await fetch(
    `https://api.kinsta.com/v2/sites?company=${companyId}`,

    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Fetch Site by ID
export async function fetchSiteByID(siteId) {
  const res = await fetch(
    `https://api.kinsta.com/v2/sites/${siteId}`,

    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Clear Kinsta Cache
export async function clearKinstaCache(envId) {
  const res = await fetch(`https://api.kinsta.com/v2/sites/tools/clear-cache`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      environment_id: `${envId}`,
    }),
  });

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Restart PHP
export async function restartPHP(envId) {
  const res = await fetch(`https://api.kinsta.com/v2/sites/tools/restart-php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      environment_id: `${envId}`,
    }),
  });

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
