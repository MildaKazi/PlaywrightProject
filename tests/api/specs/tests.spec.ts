import { test, expect } from "@playwright/test";

const BASE_URL = "https://petstore.swagger.io/v2";
const HEADERS = { api_key: "special-key" };

test.describe("Petstore", () => {
  const petIds = [];
  const orderIds = [];

  test.afterEach(async ({ request }) => {
    for (const id of orderIds) {
      const response = await request.delete(`${BASE_URL}/store/order/${id}`, {
        headers: HEADERS,
      });
      if (response.ok) {
        console.log("deleting", response.status(), "status,id", id);
      } else {
        console.error(
          `Failed to delete ID: ${id}. Status: ${response.status()}`,
        );
      }
    }

    for (const id of petIds) {
      const response = await request.delete(`${BASE_URL}/pet/${id}`, {
        headers: HEADERS,
      });
      if (response.ok) {
        console.log("deleting", response.status(), "status,id", id);
      } else {
        console.error(
          `Failed to delete  ID: ${id}. Status: ${response.status()}`,
        );
      }
    }

    for (const id of petIds) {
      const response = await request.get(`${BASE_URL}/pet/${id}`);
      expect(response.status()).toBe(404);
    }

    for (const id of orderIds) {
      const response = await request.get(`${BASE_URL}/store/order/${id}`);
      expect(response.status()).toBe(404);
    }
  });

  test("should create pets and place order", async ({ request }) => {
    const generateId = () => Math.floor(Date.now() + Math.random() * 10000);

    for (let i = 0; i < 4; i++) {
      const response = await request.post(`${BASE_URL}/pet`, {
        data: { id: generateId(), name: `pet${i}`, status: "available" },
      });
      const body = await response.json();
      if (response.ok) {
        console.log("pet", response.status(), "status,id", body.id);
      }
      petIds.push(body.id);
    }

    for (const petId of petIds) {
      for (let j = 0; j < 2; j++) {
        const response = await request.post(`${BASE_URL}/store/order`, {
          data: {
            id: generateId(),
            petId: petId,
            quantity: 1,
            status: "placed",
          },
        });
        const body = await response.json();
        if (response.ok) {
          console.log("order", response.status(), "status,id", body.id);
        }
        orderIds.push(body.id);
      }
    }
  });
});

/*
Additional tests that might be written:
Name field validation if it's mandatory.
Order status field out of enum [ placed, approved, delivered ]
Make order with non existant pet id. 
*/
