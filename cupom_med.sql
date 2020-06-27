-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25-Jun-2020 às 00:28
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cupom_med`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clinica`
--

CREATE TABLE `clinica` (
  `id` int(255) NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `clinica`
--

INSERT INTO `clinica` (`id`, `nome`, `img`) VALUES
(5, 'Clínica Popular', 'http://localhost/cupom_med/imgs/clinicas/cli-pop.jpg'),
(6, 'Clínica Docctor Med', 'http://localhost/cupom_med/imgs/clinicas/cli-doc.jpg'),
(7, 'Clínica Oftalmologia', 'http://localhost/cupom_med/imgs/clinicas/cli-oft.jpg'),
(8, 'Clínica da Cidade', 'http://localhost/cupom_med/imgs/clinicas/cli-cid.jpg'),
(9, 'MEDMANDIC', 'http://localhost/cupom_med/imgs/clinicas/medmandic.jpg'),
(10, 'Dr. Campinas', 'http://localhost/cupom_med/imgs/clinicas/dr-camp.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `desconto`
--

CREATE TABLE `desconto` (
  `id_cupom` int(255) NOT NULL,
  `id_clinica` int(255) NOT NULL,
  `servico` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `porcentagem` float NOT NULL,
  `preco_original` float NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `desconto`
--

INSERT INTO `desconto` (`id_cupom`, `id_clinica`, `servico`, `porcentagem`, `preco_original`, `data`) VALUES
(9, 7, 'Exame de visão', 10, 100, '2020-06-24'),
(10, 5, 'Ultrassom', 25, 190, '2020-06-24'),
(11, 6, 'Ultrassom', 10, 275, '2020-06-24'),
(12, 8, 'Dentista', 10, 100, '2020-06-24'),
(13, 9, 'Exame de sangue', 10, 80, '2020-06-24');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clinica`
--
ALTER TABLE `clinica`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `desconto`
--
ALTER TABLE `desconto`
  ADD PRIMARY KEY (`id_cupom`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clinica`
--
ALTER TABLE `clinica`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `desconto`
--
ALTER TABLE `desconto`
  MODIFY `id_cupom` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
