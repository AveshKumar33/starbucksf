"use client";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import LandingServices from "@/services/landing.services";

interface LandingPageType {
  _id: string;
  uuid: string;
  companyLogo: string;
  resturantName: string;
  header: string;
  backgroundImage: string;
  termCondition: string;
  createdAt: string;
  updatedAt: string;
}

const Terms = () => {
  const [newLanding, setNewLanding] = useState<LandingPageType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getAll = async () => {
    try {
      const result = await LandingServices.getLanding();
      if (result.success) {
        // console.log(result);
        setNewLanding(result.data[0]);
      }
      setLoading(false);
    } catch (error) {
      setNewLanding(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F0F6FE",
          height: "100%",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            maxWidth: "600px",
            boxShadow: 2,
            borderRadius: "12px",
            borderTop: "3px solid #008DF1",
            mx: "auto",
            padding: "20px",
            height: "auto",
          }}
        >
          <Divider>
            <Typography variant="h6">Term & Condition</Typography>
          </Divider>
          <Typography sx={{ marginTop: "20px" }} variant="h5">
            DATA PROTECTION NOTICE FOR CUSTOMERS
          </Typography>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {newLanding && newLanding.termCondition ? (
                <Box sx={{ paddingLeft: "20px" }}>
                  <div dangerouslySetInnerHTML={{ __html: newLanding.termCondition }} />
                </Box>
              ) : (
                <>
                  <div
                    style={{ display: newLanding && newLanding.termCondition ? "none" : "block" }}
                  >
                    <Typography variant="caption" sx={{ marginTop: "20px" }}>
                      This Data Protection Notice (“Notice”) sets out the basis which Hans Im Gluck
                      (“we”, “us”, or “our”) may collect, use, disclose or otherwise process
                      personal data of our customers in accordance with the Personal Data Protection
                      Act (“PDPA”). This Notice applies to personal data in our possession or under
                      our control, including personal data in the possession of organisations which
                      we have engaged to collect, use, disclose or process personal data for our
                      purposes.
                    </Typography>
                    <Typography variant="subtitle2" sx={{ pt: "10px" }}>
                      PERSONAL DATA
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      1. As used in this Notice:{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      “customer” means an individual who (a) has contacted us through any means to
                      find out more about any goods or services we provide, or (b) may, or has,
                      entered into a contract with us for the supply of any goods or services by us;
                      and{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      “personal data” means data, whether true or not, about a customer who can be
                      identified: (a) from that data; or (b) from that data and other information to
                      which we have or are likely to have access.{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      2. Depending on the nature of your interaction with us, some examples of
                      personal data which we may collect from you include name, identification
                      numbers such as nric, fin, work permit and birth certificate, residential
                      address, email address, telephone number, nationality, gender, date of birth,
                      marital status, employment information and financial information.{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      3. Other terms used in this Notice shall have the meanings given to them in
                      the PDPA (where the context so permits).{" "}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ pt: "10px" }}>
                      COLLECTION, USE AND DISCLOSURE OF PERSONAL DATA{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      4. We generally do not collect your personal data unless (a) it is provided to
                      us voluntarily by you directly or via a third party who has been duly
                      authorised by you to disclose your personal data to us (your “authorised
                      representative”) after (i) you (or your authorised representative) have been
                      notified of the purposes for which the data is collected, and (ii) you (or
                      your authorised representative) have provided written consent to the
                      collection and usage of your personal data for those purposes, or (b)
                      collection and use of personal data without consent is permitted or required
                      by the PDPA or other laws. We shall seek your consent before collecting any
                      additional personal data and before using your personal data for a purpose
                      which has not been notified to you (except where permitted or authorised by
                      law).{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      5. We may collect and use your personal data for any or all of the following
                      purposes:
                      <br />
                      (a) performing obligations in the course of or in connection with our
                      provision of the goods and/or services requested by you;
                      <br />
                      (b) verifying your identity;
                      <br />
                      (c) responding to, handling, and processing queries, requests, applications,
                      complaints, and feedback from you;
                      <br />
                      (d) managing your relationship with us;
                      <br />
                      (e) processing payment or credit transactions;
                      <br />
                      (f) complying with any applicable laws, regulations, codes of practice,
                      guidelines, or rules, or to assist in law enforcement and investigations
                      conducted by any governmental and/or regulatory authority;
                      <br />
                      (g) any other purposes for which you have provided the information;
                      <br />
                      (h) transmitting to any unaffiliated third parties including our third party
                      service providers and agents, and relevant governmental and/or regulatory
                      authorities, whether in Singapore or abroad, for the aforementioned purposes;
                      and
                      <br />
                      (i) any other incidental business purposes related to or in connection with
                      the above.{" "}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ py: "10px" }}>
                      6. We may disclose your personal data:{" "}
                    </Typography>
                    <Typography variant="caption" sx={{ pt: "10px" }}>
                      (a) where such disclosure is required for performing obligations in the course
                      of or in connection with our provision of the goods and services requested by
                      you; or <br />
                      (b) to third party service providers, agents and other organisations we have
                      engaged to perform any of the functions with reference to the above mentioned
                      purposes.{" "}
                    </Typography>
                  </div>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Terms;
