import { useState } from "react";
import { useFetcher } from "react-router";
import { Page, Card, TextField, Button } from "@shopify/polaris";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { connectMongo } from "../mongo.server";
import { Announcement } from "../models/announcement.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  await connectMongo();

  const formData = await request.formData();
  const text = formData.get("text");

  await Announcement.create({
    shop: session.shop,
    text,
  });

  const shopResponse = await admin.graphql(`
    {
      shop {
        id
      }
    }
  `);

  const shopData = await shopResponse.json();
  const shopId = shopData.data.shop.id;

  // 3️⃣ Save to Shopify Metafield
  await admin.graphql(
    `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
          }
        }
      }
    `,
    {
      variables: {
        metafields: [
          {
            namespace: "my_app",
            key: "announcement",
            type: "single_line_text_field",
            ownerId: shopId,
            value: text,
          },
        ],
      },
    }
  );

  return Response.json({ success: true });
};

export default function AnnouncementPage() {
  const fetcher = useFetcher();
  const [text, setText] = useState("");

  return (
    <Page title = "Announcement Banner">
      <Card>
        <div style={{ padding: "20px" }}>
          <TextField
            label="Announcement Text"
            value={text}
            onChange={setText}
            autoComplete="off"
          />

          <br />

          <Button
            primary
            onClick={() =>
              fetcher.submit(
                { text },
                { method: "post" }
              )
            }
          >
            Save
          </Button>
        </div>
      </Card>
    </Page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
