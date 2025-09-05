// netlify/functions/list-articles.js
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify([
      "cara-mudah-membedakan-kain-carded-dan-cotton-combed",
      "kelebihan-kain-cotton-combed",
      "tips-memilih-bahan-kaos", 
      "perbedaan-sablon-plastisol-dan-digital-printing"
    ])
  };
};