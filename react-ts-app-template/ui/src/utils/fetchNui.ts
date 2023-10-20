import { isEnvBrowser } from "./misc";

export async function fetchNui<T = any>(
  eventName: string,
  data?: any,
  externalResource?: string,
  mockData?: T,
  timeoutMilliseconds: number = 10000 // Default timeout of 10 seconds
): Promise<T> {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockData) return mockData;

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : "nui-frame-app";

  try {
    const respPromise = fetch(
      `https://${externalResource ?? resourceName}/${eventName}`,
      options
    );

    // Use Promise.race to implement a timeout
    const timeoutPromise = new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error("Request timed out")),
        timeoutMilliseconds
      )
    );

    const resp = (await Promise.race([
      respPromise,
      timeoutPromise,
    ])) as Response;
    const respFormatted = (await resp.json()) as T;

    if (!resp.ok) {
      // Handle HTTP errors here if needed
      throw new Error(`HTTP error: ${resp.status} - ${resp.statusText}`);
    }

    return respFormatted;
  } catch (error) {
    // Handle exceptions and errors here
    console.error("An error occurred:", error);
    throw error; // Rethrow the error so that the caller can handle it
  }
}
