--
-- Base de datos: `prueba-twitch`
--
CREATE DATABASE prueba-twitch;
-- --------------------------------------------------------
USE prueba-twitch;
--
-- Estructura de tabla para la tabla `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscription_id` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `broadcaster_user_id` varchar(45) NOT NULL,
  `created_at` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
