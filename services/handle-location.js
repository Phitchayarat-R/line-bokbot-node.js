const axios = require("axios").default;
const { client } = require("../config/line");
const { botSendRepairDetail } = require("./bot-user-step/3-bot-send-repair-detail");
const { updateRepairForm } = require("./repair/index");
process.env.AQI_KEY
const AQI_API_KEY = process.env.AQI_KEY;

exports.handleLocation = async (event) => {
    //console.log("location ", event.message);

    if (global.repairId) {
        let location = `${event.message.latitude},${event.message.longitude}`;

        const repairData = {
            location: location,
        }
            await updateRepairForm(global.repairId, repairData);

            let msg = botSendRepairDetail();
            return client.replyMessage(event.replyToken, msg);
        
        } else {
            let latitude = event.message.latitude;
            let longitude = event.message.longitude;
            let address = event.message.address;

    
            try {
                const response = await axios.get(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${AQI_API_KEY}`);
                //console.log("response  ", response );
                
                // Extract AQI value from the response
                const city = response.data.data.city;
                const AQI = response.data.data.current.pollution.aqius;
                const temperature = response.data.data.current.weather.tp;
                const weatherIcon = response.data.data.current.weather.ic;

                var level;
                var bgColor;
                var maskUrl;
                var weatherIconUrl;
          
                switch (weatherIcon) {
                  case "01d":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/01d.png";
                    break;
                  case "01n":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/01n.png";
                    break;
                  case "02d":
                    weatherIconUrl =
                      "https://img5.pic.in.th/file/secure-sv1/02d.png";
                    break;
                  case "02n":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/02n.png";
                    break;
                  case "03d":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/03d.png";
                    break;
                  case "03n":
                    weatherIconUrl =
                      "https://img5.pic.in.th/file/secure-sv1/03n.png";
                    break;
                  case "04d":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/03d.png";
                    break;
                  case "09d":
                    weatherIconUrl =
                      "https://img5.pic.in.th/file/secure-sv1/09.png";
                    break;
                  case "10d":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/10d.png";
                    break;
                  case "10n":
                    weatherIconUrl =
                      "https://img5.pic.in.th/file/secure-sv1/10n.png";
                    break;
                  case "11d":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/11d.png";
                    break;
                  case "13d":
                    weatherIconUrl =
                      "https://img5.pic.in.th/file/secure-sv1/13ba1e03d43cad7317.png";
                    break;
                  case "50d":
                    weatherIconUrl =
                      "https://img2.pic.in.th/pic/5021c91fd66505e5e0.png";
                }
          
                if (AQI < 50) 
                {
                  level = "อากาศดี";
                  bgColor = "#a8e05f";
                  textColor = "#718b3A";
                  maskUrl =
                    "https://img5.pic.in.th/file/secure-sv1/AQ-Good.png";

                } else if (AQI < 100) 
                {
                  level = "ปานกลาง";
                  bgColor = "#fdd74b";
                  textColor = "#a57f23";
                  maskUrl =
                    "https://img2.pic.in.th/pic/AQ-Moderate.png";

                } else if (AQI < 150) 
                {
                  level = "อากาศแย่";
                  bgColor = "#fe9b57";
                  textColor = "#b25826";
                  maskUrl =
                    "https://img5.pic.in.th/file/secure-sv1/AQ-UnhealthySensitive.png";

                } else if (AQI < 200) 
                {
                  level = "แย่มาก";
                  bgColor = "#fe6a69";
                  textColor = "#af2c3b";
                  maskUrl =
                    "https://img2.pic.in.th/pic/AQ-Unhealthy.png";

                } else if (AQI < 300) 
                {
                  level = "อันตราย";
                  bgColor = "#a97abc";
                  textColor = "#634675";
                  maskUrl =
                    "https://img5.pic.in.th/file/secure-sv1/AQ-VeryUnhealthy.png";
                } else 
                {
                  level = "อันตรายมาก";
                  bgColor = "#a87383";
                  textColor = "#683e51";
                  maskUrl =
                    "https://img2.pic.in.th/pic/AQ-VeryUnhealthy.png";
                }
                
                const flexMessage = {
                    type: "flex",
                    altText: "คุณภาพอากาศ AQI",
                    contents: {
                        type: "bubble",
                        header: {
                            type: "box",
                            layout: "horizontal",
                            contents: [
                                {
                                    type: "text",
                                    text: city,
                                    color: "#414141",
                                    gravity: "center",
                                    size: "xl",
                                    wrap: true,
                                    flex: 3
                                },
                                {
                                    type: "image",
                                    url: weatherIconUrl,
                                    size: "xs",
                                    flex: 1
                                },
                                {
                                    type: "text",
                                    text: `${temperature} °C`,
                                    color: "#414141",
                                    size: "lg",
                                    align: "end",
                                    gravity: "center",
                                    flex: 1
                                }
                            ]
                        },
                        body: {
                            type: "box",
                            layout: "vertical",
                            contents: [
                                {
                                    type: "box",
                                    layout: "horizontal",
                                    contents: [
                                        {
                                            type: "image",
                                            url: maskUrl,
                                            size: "md",
                                            align: "start"
                                        },
                                        {
                                            type: "text",
                                            text: level,
                                            wrap: true,
                                            size: "28px",
                                            color: "#683e51",
                                            gravity: "center",
                                            align: "center"
                                        }
                                    ],
                                    margin: "xxl"
                                },
                                {
                                    type: "box",
                                    layout: "baseline",
                                    contents: [
                                        {
                                            type: "text",
                                            text: `${AQI}`,
                                            color: "#683e51",
                                            size: "5xl",
                                            align: "center"
                                        },
                                        {
                                            type: "text",
                                            text: "US AQI",
                                            color: "#683e51",
                                            size: "19px",
                                            margin: "sm",
                                            align: "center"
                                        }
                                    ]
                                }
                            ]
                        },
                        styles: {
                            body: {
                                backgroundColor: bgColor
                            }
                        }
                    }
                };
                
                // Send the Flex Message
                return client.replyMessage(event.replyToken, flexMessage);
            } catch (error) {
                console.error("Error fetching AQI data:", error);
                return;
            }
    }
};
