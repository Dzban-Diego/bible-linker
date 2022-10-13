const verse = async (req, res) => {
  console.log(req)
  if(!req.chapter_index || !req.book_index) return
  const response = await fetch(
    `https://wol.jw.org/pl/wol/b/r12/lp-p/nwtsty/${req.book_index}/${req.chapter_index}`,
  );
  res.status(200).json(await response.text());
};
