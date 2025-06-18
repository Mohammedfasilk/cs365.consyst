import React, { useRef } from "react";
import { Button } from "../UI/Button";
import { useToast } from "../../Hooks/use-toast"
import { CircleCheckIcon, CircleXIcon, CopyIcon } from "lucide-react";
import LinkedIn from '../../assets/linkedin-logo.png'
import Facebook from '../../assets/facebook-logo.png'
import instagram from '../../assets/instagram-logo.png'
import YouTube from '../../assets/youtube-logo.png'
import Consyst_Logo from '../../assets/consyst_logo.png'

const EmailSignature = ({ name, designation, addresses, phone, disclaimer,banner }) => {
  const signatureRef = useRef(null);
  const { toast } = useToast();

  const copyToClipboard = () => {
    if (signatureRef.current) {
      const signatureHTML = signatureRef.current.innerHTML;

      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([signatureHTML], { type: "text/html" });
        const data = [new ClipboardItem({ "text/html": blob })];

        navigator.clipboard.write(data).then(
          () => {
            toast({
              title: "Signature Copied",
              description: "The signature has been copied to clipboard.",
              icon: <CircleCheckIcon className="mr-4" color="green" />,
            });
          },
          (err) => {
            toast({
              title: "Failed to Copy Signature",
              description: "Something went wrong copying the signature.",
              variant: "destructive",
              icon: <CircleXIcon className="mr-4" color="red" />,
            });
            console.error(err);
          }
        );
      } else {
        navigator.clipboard.writeText(signatureHTML).then(
          () => {
            toast({
              title: "Signature Copied (Plain Text)",
              description: "Copied using fallback method.",
              icon: <CircleCheckIcon className="mr-4" color="green" />,
            });
          },
          (err) => {
            toast({
              title: "Failed to Copy Signature",
              description: "Something went wrong copying the signature.",
              variant: "destructive",
              icon: <CircleXIcon className="mr-4" color="red" />,
            });
            console.error(err);
          }
        );
      }
    }
  };

  return (
    <div className="flex gap-2">
      <div ref={signatureRef}>
        <table
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            width: "100%",
            maxWidth: "600px",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              {/* Left Section */}
              <td
                style={{
                  width: "200px",
                  paddingRight: "15px",
                  borderRight: "1px solid #ccc",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  verticalAlign: "top",
                }}
              >
                <img
                  src={Consyst_Logo}
                  alt="Consyst Logo"
                  style={{
                    height: "50px",
                    marginBottom: "10px",
                    objectFit: "cover",
                  }}
                />
                <p
                  style={{
                    margin: "0",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "gray",
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  }}
                >
                  Automation.<br />
                  Futurism.<br />
                  Sustainability.
                </p>
              </td>

              {/* Right Section */}
              <td
                style={{
                  width: "65%",
                  verticalAlign: "top",
                  paddingLeft: "20px",
                  paddingTop: "20px",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: "2px" }}>
                        {name && (
                          <p
                            style={{
                              margin: "0",
                              fontWeight: "bold",
                              fontStyle: "italic",
                              color: "#e13e13",
                              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                              fontSize: "14px",
                            }}
                          >
                            {name}
                          </p>
                        )}
                        {designation && (
                          <p
                            style={{
                              margin: "0",
                              fontWeight: "bold",
                              fontSize: "12px",
                              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                            }}
                          >
                            {designation}
                          </p>
                        )}
                        {phone && (
                          <p
                            style={{
                              margin: "0 0 8px 0",
                              fontSize: "12px",
                              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                            }}
                          >
                            <strong>Cell:</strong>{" "}
                            <a href={"tel:" + phone} style={{ textDecoration: "none", color: "#000" }}>
                              {phone}
                            </a>
                          </p>
                        )}
                      </td>
                    </tr>

                    {Array.isArray(addresses) &&
                      addresses.map((address, i) => (
                        <tr key={i}>
                          <td style={{ paddingBottom: "5px" }}>
                            <p
                              style={{
                                margin: "0 0 1px 0",
                                fontWeight: "bold",
                                color: "#e13e13",
                                fontSize: "12px",
                                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                              }}
                            >
                              {address.title}
                            </p>
                            {address.content.split("\n").map((line, index) => (
                              <p
                                key={index}
                                style={{
                                  margin: "0",
                                  fontSize: "12px",
                                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                                }}
                              >
                                {line}
                              </p>
                            ))}
                          </td>
                        </tr>
                      ))}

                    <tr>
                      <td>
                        <table style={{ marginTop: "10px", width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="https://www.consyst.biz"
                                  style={{
                                    textDecoration: "none",
                                    color: "#336699",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    display: "block",
                                    marginBottom: "10px",
                                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                                  }}
                                >
                                  www.consyst.biz
                                </a>
                              </td>
                              <td style={{ width: "25px" }}>
                                <a href="https://www.linkedin.com/company/con-syst/" title="LinkedIn">
                                  <img src={LinkedIn} alt="LinkedIn" style={{ width: "20px" }} />
                                </a>
                              </td>
                              <td style={{ width: "25px" }}>
                                <a href="https://www.facebook.com/consyst.biz" title="Facebook">
                                  <img src={Facebook} alt="Facebook" style={{ width: "20px" }} />
                                </a>
                              </td>
                              <td style={{ width: "25px" }}>
                                <a href="https://www.youtube.com/@CONSYSTGroup" title="YouTube">
                                  <img src={YouTube} alt="YouTube" style={{ width: "20px" }} />
                                </a>
                              </td>
                              <td style={{ width: "25px" }}>
                                <a href="https://www.instagram.com/consyst.biz/" title="Instagram">
                                  <img src={instagram} alt="Instagram" style={{ width: "20px" }} />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <img src={banner} alt="Company Banner" style={{ width: "600px" }} />
              </td>
            </tr>

            {disclaimer && (
              <tr>
                <td colSpan={2} style={{ fontStyle: "italic", color: "gray", fontSize: "12px" }}>
                  {disclaimer}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <Button onClick={copyToClipboard} size="icon" variant="outline">
          <CopyIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EmailSignature;

