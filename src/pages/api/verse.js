export default async function handler(req, res) {
  const data = await fetch(
      `https://wol.jw.org/pl/wol/b/r12/lp-p/nwtsty/${req.query.b}/${req.query.c}`,
  ).then((response) => response.text())
  res.status(200).json( {data: data} );
}