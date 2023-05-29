const request = require("supertest");
import { app, server } from "../server";

afterAll(() => {
  server.close();
})

const idImagem = "15a6381e-7d7d-401a-a244-331ed3467d0d";
let imagem = "https://reckoning-image";

describe("Testar rota post de imagem", () => {
  it("Deve criar uma imagem", async () => {
    const res = await request(app).post("/imagem").send({
      "idImagem": `${idImagem}`,
      "imagem": `${imagem}`
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.idImagem).toBe(`${idImagem}`);
    expect(res.body.imagem).toBe(`${imagem}`);
  });
});


describe("Testar rota get de uma imagem", () => {
  it("Deve responder uma imagem", async () => {
    const res = await request(app).get(`/imagem/${idImagem}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.imagem).toBe(`${imagem}`);
  });
});

describe("Testar rota get de listar todas as imagens", () => {
  it("Deve listar todas as imagens", async () => {
    const res = await request(app).get("/imagem");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("Testar rota de atualizar a imagem", () => {
  it("Deve atualizar a imagem solicitada", async () => {
    imagem = "https://Reckoning-image-home"
    const res = await request(app).put(`/imagem/${idImagem}`).send({
        "imagem": `${imagem}`
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.imagem).toBe(`${imagem}`);
  });
});

describe("Testar rota de deletar a imagem", () => {
  it("Deve deletar a imagem solicitada", async () => {
    const res = await request(app).delete(`/imagem/${idImagem}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.idImagem).toBe(`${idImagem}`);
    expect(res.body.imagem).toBe(`${imagem}`);
  });
});