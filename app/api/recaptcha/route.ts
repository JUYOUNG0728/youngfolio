import { NextResponse } from "next/server";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

const client = new RecaptchaEnterpriseServiceClient();

export async function POST(req: Request) {
  try {
    const { token, action } = await req.json();

    const projectID = process.env.RECAPTCHA_PROJECT_ID!;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

    const [assessment] = await client.createAssessment({
      parent: client.projectPath(projectID),
      assessment: {
        event: { token, siteKey },
      },
    });

    const props = assessment.tokenProperties;

    if (!props) {
      return NextResponse.json({
        success: false,
        score: 0,
        reason: "missing-token-properties",
      });
    }

    if (!props.valid) {
      return NextResponse.json({
        success: false,
        score: 0,
        reason: props.invalidReason,
      });
    }

    if (props.action !== action) {
      return NextResponse.json({
        success: false,
        score: 0,
        reason: "action-mismatch",
      });
    }

    const score = assessment.riskAnalysis?.score ?? 0;

    return NextResponse.json({
      success: score >= 0.5,
      score,
    });
  } catch (err) {
    console.error("reCAPTCHA error:", err);
    return NextResponse.json({ success: false, score: 0 });
  }
}
