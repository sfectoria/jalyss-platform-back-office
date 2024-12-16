import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Autocomplete, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { ip } from "../constants/ip";

const SearchField = ({
  handelBarcodeSu,
  handelBarcodeEr,
  handelNSearch,
  info,
  type,
  state
}) => {
  const [searchText, setSearchText] = useState("");
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [hoveredImage, setHoveredImage] = useState(null);
  console.log(state,'gg');
  
  useEffect(() => {
    if (
      info.type === "BR" ||
      info.type === "Bl" ||
      info.type === "Blf" ||
      info.type === "f" ||
      info.type === "ticket"
    ) {
      fetchDataStock();
    } else if (info.type === "BT" || info.type === "BS") {
      fetchDataStockBtOrBs()
    // } else if (info.type === "BC") {
    //   fetchDataOfAllChannels()
    } else if (
      info.type === "BL" ||
      info.type === "BRe" ||
      info.type === "BLF" ||
      info.type === "F" ||
      info.type === "Ticket" ||
      info.type === "Devis" ||
      info.type === "BC"
    
      //  ||info.type === "BC"
    ) {
      fetchDataChannel();
    }
  }, [refresh, info]);
  console.log("from BL",info, type);
  console.log("from ",type);

  const mergeAndSortByDate = (exitNotes, receiptNotes) => {
    const combined = [
      ...exitNotes.map((item) => ({
        ...item,
        type: "exit",
        date: new Date(item.exitDate),
        id: `exit-${item.id}`,
      })),
      ...receiptNotes.map((item) => ({
        ...item,
        type: "receipt",
        date: new Date(item.receiptDate),
        id: `receipt-${item.id}`,
      })),
    ];

    return combined.sort((a, b) => a.date - b.date);
  };
  const fetchDataChannel = async () => {
    const isSenderValid = info.sender !== 0 && info.sender !== "0";
    const isReceiverValid = info.type === "BRe" && info.receiver !== 0 && info.receiver !== "0";
  
    if (isSenderValid || isReceiverValid) {
      const stockId = isReceiverValid ? info.receiver : info.sender;
      const findStockResponse = await axios.get(`${ip}/selling/${stockId}`);
      console.log("This is me", findStockResponse.data);
      if (findStockResponse.data) {
        let params = {notNullQuan:1};
        if (text) params["text"] = text;
        const response = await axios.get(
          `${ip}/stocks/${findStockResponse.data.idStock}`,
          { params }
        );
        console.log("hello from search Field", response.data.data);
        console.log("hello from search Field 1", response.data?.data?.stockArticle[0]?.article?.archived);
        const result = response.data.data.stockArticle
        .filter(e => e.article.archived === false)
        .reduce(
          (acc, item) => {
            acc.data.push({
              id: item.articleId,
              name: item.article?.title,
              code: item.article?.code,
              image: item.article?.cover?.path,
              author: item.article?.articleByAuthor?.length
                ? item.article?.articleByAuthor[0]?.author?.nameAr
                : null,
              publisher: item.article?.articleByPublishingHouse.length
                ? item.article?.articleByPublishingHouse[0]?.publishingHouse?.nameAr
                : null,
              quantity: item.quantity,
              price: 0,
            });
            acc.ids.push(item.articleId);
            return acc;
          },
          {
            data: [],
            ids: [],
          }
        );
      
        const responsePriceByChannel = await axios.get(
          `http://localhost:3000/price-By-Channel/getAll`,
          { params: { salesChannelIds: info.type === "BRe" ? [info.receiver] : [info.sender], articleIds: result.ids } }
        );

        result.data.forEach((article) => {
          const priceData = responsePriceByChannel.data.find(
            (priceItem) => priceItem.idArticle === article.id
          );
          if (priceData) {
            article.price = priceData.price;
          }
        });
        console.log("result", result);
        setRows(result.data);
        console.log("Result after fetching prices:",result.data);
      }
    }
  };
  const fetchDataStock = async () => {
    let params = {};
    if (text) params["text"] = text;
    const findArticleResponse = await axios.get(`${ip}/articles/getAll`, {
      params,
    });
    console.log("this is me ", findArticleResponse.data.data);
    const result = findArticleResponse.data.data.reduce((acc, item) => {
      acc.push({
        id: item.id,
        name: item?.title,
        code: item?.code,
        image: item.cover && item?.cover?.path,
        author: item?.articleByAuthor?.length
          ? item?.articleByAuthor[0]?.author?.nameAr
          : null,
        publisher: item.articleByPublishingHouse.length
          ? item.articleByPublishingHouse[0].publishingHouse.nameAr
          : null,
        // quantity: item.quantity,
      });
      return acc;
    }, []);
    setRows(result);
    console.log(result);
  };
  
  // const fetchDataOfAllChannels = async () => {
  //   let params = {};
  //   if (text) params["text"] = text;
  //   const findArticleResponse = await axios.get(`${ip}/articles/getAll`, {
  //     params,
  //   });
  //   console.log("this is me ", findArticleResponse.data.data);
  //   const result = findArticleResponse.data.data.reduce((acc, item) => {
  //     acc.push({
  //       id: item.id,
  //       name: item?.title,
  //       code: item?.code,
  //       image: item.cover && item?.cover?.path,
  //       author: item?.articleByAuthor?.length
  //         ? item?.articleByAuthor[0]?.author?.nameAr
  //         : null,
  //       publisher: item.articleByPublishingHouse.length
  //         ? item.articleByPublishingHouse[0].publishingHouse.nameAr
  //         : null,
  //       // quantity: item.quantity,
  //     });
  //     return acc;
  //   }, []);
  //   setRows(result);
  //   console.log(result);
  // };


  const fetchDataStockBtOrBs = async () => {
    if (!!info.sender) {
      console.log("here the info sender",info.sender);
      
      const response = await axios.get(`${ip}/stocks/${info.sender}`,{params:{notNullQuan:1}});
      console.log("im here mrabet", response.data.data.stockArticle);
      const result = response.data.data.stockArticle
      .filter(item => item?.article.archived === false) 
      .reduce((acc, item) => {
        acc.push({
          id: item.articleId,
          name: item?.article?.title,
          code: item?.article?.code,
          image: item?.article?.cover?.path,
          author: item?.article?.articleByAuthor[0]?.author?.nameAr,
          publisher:
            item?.article?.articleByPublishingHouse[0]?.publishingHouse?.nameAr,
          quantity: item?.quantity,
        });
        return acc;
      }, []);
      setRows(result); 
    }
  };
  const handleInputChange = (event, value) => {
    console.log(value, "test here");
    setSearchText(value);
  };
  const handleInputSearch = (event) => {
    console.log(event.target.value, "test here");
    setText(event.target.value);
    setRefresh(!refresh);
  };

  const handelNormalSearch = (event, value) => {
    console.log(value, "before condition");
    if (value) {
      event.target.value = "";
      console.log(value, "after condition");

      handelNSearch(event, value);
      setText("");
    }
  };

  const handelBarcodeSearch = async (event) => {
    console.log(event?.target?.value, "before condition");
    if ((type === "BR" ||type === "Bl" ||type === "Blf" ||type === "f") && !!event?.target?.value) {
      const response = await axios.get(
        `${ip}/articles/barCode/${event?.target?.value}`
      );
      if (typeof response.data === "object") {
        let e = response.data;
        const prod = {
          id: e?.id,
          name: e?.title,
          code: e?.code,
          image: e?.cover?.path,
          author: e?.articleByAuthor[0]?.author?.nameAr,
          publisher: e?.articleByPublishingHouse[0]?.publishingHouse?.nameAr,
        };
        handelBarcodeSu(prod);
        event.target.value = "";
      }
      if (typeof response.data === "string") {
        handelBarcodeEr(response.data);
      }
    } else if (
      type === "BL" ||
      type === "BLF" ||
      type === "F" ||
      type === "Ticket" ||
      type === "Devis" ||
      type === "BC" ||
      type === "BT" ||
      type === "BRe"
    ) {
      if (!!event.target.value) {
        const response = await axios.get(
          `${ip}/stocks/code/${event?.target?.value}`
        );
        if (typeof response.data === "object") {
          let e = response.data;
          const responsePriceByChannel = await axios.get(
            `http://localhost:3000/price-By-Channel/getAll`,
            {
              params: {
                salesChannelIds: [info.sender],
                articleIds: [e.articleId],
              },
            }
          );
          console.log(responsePriceByChannel.data);

          const prod = {
            id: e?.articleId,
            name: e?.article?.title,
            code: e?.article?.code,
            image: e?.article?.cover?.path,
            author: e?.article?.articleByAuthor[0]?.author?.nameAr,
            publisher:
              e?.article?.articleByPublishingHouse[0]?.publishingHouse?.nameAr,
            quantity: e?.quantity,
            price: responsePriceByChannel?.data[0]?.price
              ? responsePriceByChannel?.data[0]?.price
              : 0,
          };
          console.log(response);

          handelBarcodeSu(prod);
          event.target.value = "";
        }

        if (typeof response.data === "string") {
          handelBarcodeEr(response.data);
        }
      }
    }
  };

  const handleMouseEnter = (image) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <tr style={{ width: "100%" }}>
      <td colSpan={6}>
        <div
          className="d-flex gap-3 align-items-center"
          style={{ width: "100%" }}
        >
          <div style={{ width: "25%" }}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Bar Code"
                onChange={(event) => handelBarcodeSearch(event)}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-upc-scan"></i>
              </button>
            </div>
          </div>
          <div style={{ width: "70%" }}>
            <Autocomplete
              sx={{ width: "100%" }}
              freeSolo
              inputValue={searchText}
              onInputChange={handleInputChange}
              options={rows}
              onChange={handelNormalSearch}
              getOptionLabel={(option) => ``}
              filterOptions={(options) => options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  placeholder="Search ..."
                  onChange={handleInputSearch}
                />
              )}
              renderOption={(props, option) => (
                <MenuItem {...props} key={option.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={option.image}
                      alt="img"
                      style={{ width: 50, cursor: "pointer" }}
                      onMouseEnter={() => handleMouseEnter(option.image)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div className="ms-2">
                      <Typography variant="body1">{`${option.name}`}</Typography>
                    </div>
                    {option.price !== 0 && type !== "BR" && type!=="BS" && type!=="BT" && state!=="purchase"  && (
                      <div className="ms-2">
                        <Typography variant="body1">{` | ${option.price} DT `}</Typography>
                      </div>
                    )}
                    {option.author  && (state==="purchase"||type==="BT") && (
                      <div className="ms-2">
                        <Typography variant="body1">{` | ${option.author}`}</Typography>
                      </div>
                    )}
                    {option.publisher && (state==="purchase"||type==="BT") && (
                      <div className="ms-2">
                        <Typography variant="body1">{` | ${option.publisher}`}</Typography>
                      </div>
                    )}
                    {type !== "BR" && state!=="purchase" && (
                      <div className="ms-2">
                        <Typography variant="body1">{` | ${option.quantity}`}</Typography>
                      </div>
                    )}
                  </div>
                </MenuItem>
              )}
            />
          </div>
        </div>
        {hoveredImage && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              borderRadius: "10px",
              zIndex: 1500,
            }}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={hoveredImage}
              alt="Hover Preview"
              style={{ width: "300px", height: "auto" }}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default SearchField;