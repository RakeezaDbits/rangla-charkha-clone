-- Rangla Charkha – clean import for Node app (no Laravel FKs)
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `wishlist_items`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `product`;

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `email`, `full_name`, `role`, `created_at`, `password_hash`) VALUES ('55df9d2b-8bdc-4a86-869b-202348f369ba', 'rakeezasattar53@gmail.com', 'Rakeeza', 'admin', '2026-02-23 20:17:31', '$2b$10$R3zgq0IeuLNUniKZ0kyL7OAwh1MNLiVNBZjNtQSsqL1lzyw3l8uFS');

CREATE TABLE `product` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT '1',
  `sizes` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `original_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('1a063410-0670-4853-8251-0efe06b1ad3d', 'Baby Pink Lace Trim Kurta Set', '7490.00', 'lawn', 'Soft baby pink two-piece set with delicate white lace and pearl embellishments. Round neck, full sleeves with floral embroidery and scalloped lace cuffs. Matching straight trousers.', '/products/pink-kurta-lace.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-23 19:55:04', '2026-02-23 19:55:04', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('286562b8-4b3b-494e-b06f-f263fe32070a', 'Sage Green Embroidered Kurta Set', '3640.00', 'lawn', 'Light sage green kurta with floral embroidery in pink, coral and yellow. Boat neck with tassels. Matching trousers.', '/products/sage-green-embroidered-kurta.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '5200.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('2b866221-e47e-4ed4-8ce0-8c1bfc9ad1a1', 'Maroon Gold Embroidered Kurta Set', '3640.00', 'lawn', 'Deep maroon kurta with rich golden embroidery on neckline, cuffs and hem. Matching trousers. Elegant for Eid and festivities.', '/products/maroon-gold-embroidery-kurta.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '5200.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('468d73b1-cc40-4b86-ac28-b7f7b4136ecb', 'Mustard Yellow Lace Trim Kurta Set', '3360.00', 'lawn', 'Vibrant mustard yellow kurta set with white lace on cuffs and hem. V-neck with subtle embroidery. Matching straight trousers. Eid special.', '/products/mustard-lace-kurta.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '4800.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('67acb201-8dcc-46d3-a746-b76300d5520d', 'Coral Pink Casual Top', '1990.00', 'casual', 'Solid coral pink casual top. Round neck, short sleeves. Light cotton blend for daily wear.', '/products/coral-pink-casual-top.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-23 19:55:04', '2026-02-23 20:04:07', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('8990eca3-0bc1-4a30-a54c-8f09743919c4', 'Light Pink Dupatta Kurta Set', '3150.00', 'lawn', 'Pastel pink three-piece with sheer dupatta. V-neck with pearl and lace trim. Floral embroidery on hem. Eid special.', '/products/pink-dupatta-kurta.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '4500.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('b0faaada-0431-4aa2-88eb-e002dda31932', 'Black Casual Cotton Shirt', '2490.00', 'casual', 'Comfortable black cotton shirt for casual wear. Relaxed fit, full sleeves. Versatile for office or weekend.', '/products/black-casual-shirt.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-23 19:55:04', '2026-02-23 20:04:07', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('b6f6c170-c379-49ce-99b3-1e2d134ed12d', 'Sage Green Embroidered Kurta Set', '8290.00', 'lawn', 'Pastel sage green kurta with rich floral embroidery in pink, peach, orange and yellow on yoke, cuffs and hem. Round neck with small V-slit and decorative tassels. Straight-cut trousers.', '/products/green-kurta-embroidered.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-23 19:55:04', '2026-02-23 19:55:04', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('d766b48b-2321-40dd-8fe6-4519c3953c65', 'Maroon Gold Embroidered Kurta Set', '8990.00', 'lawn', 'Elegant maroon kurta set with exquisite gold floral and leaf embroidery. V-neck with heavy embroidery panel, full sleeves with embroidered cuffs. Matching straight trousers. Perfect for festive and semi-formal occasions.', '/products/maroon-kurta-gold-embroidery.png', 1, '[\"S\",\"M\",\"L\",\"XL\"]', '2026-02-23 19:55:04', '2026-02-23 19:55:04', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('dd9c72f8-a2a1-4b01-bf2b-f47de7619f0f', 'Beige Linen Trousers', '3290.00', 'casual', 'High-waist beige linen trousers. Loose fit, breathable fabric. Pairs well with kurtas or tops.', '/products/beige-linen-trousers.png', 1, '[\"S\",\"M\",\"XL\"]', '2026-02-23 19:55:04', '2026-02-23 20:04:07', NULL);

CREATE TABLE `orders` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `total` decimal(10,2) NOT NULL,
  `shipping_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address` text COLLATE utf8mb4_unicode_ci,
  `shipping_city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tracking_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orders` (`id`, `user_id`, `status`, `total`, `shipping_name`, `shipping_phone`, `shipping_address`, `shipping_city`, `tracking_number`, `created_at`, `updated_at`) VALUES ('b5b0cf4a-ba7e-4072-a0bf-934ddd73e2b8', '55df9d2b-8bdc-4a86-869b-202348f369ba', 'pending', '5280.00', 'Rakeeza Dbits', '234567890-=', 'rahim yar khan', 'Rahim Yar Khan', NULL, '2026-02-23 20:19:27', '2026-02-23 20:19:27');
INSERT INTO `orders` (`id`, `user_id`, `status`, `total`, `shipping_name`, `shipping_phone`, `shipping_address`, `shipping_city`, `tracking_number`, `created_at`, `updated_at`) VALUES ('ccfe4302-7ac9-41c1-975c-face733f232b', '55df9d2b-8bdc-4a86-869b-202348f369ba', 'pending', '3640.00', 'Rakeeza', '09253831029', 'Street1', 'Rahim yar khan', NULL, '2026-02-25 19:12:03', '2026-02-25 19:12:03');

CREATE TABLE `order_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `price`, `quantity`, `size`, `created_at`) VALUES ('03e2c757-ee36-4738-9daa-d13dc4c1ca02', 'b5b0cf4a-ba7e-4072-a0bf-934ddd73e2b8', 'dd9c72f8-a2a1-4b01-bf2b-f47de7619f0f', 'Beige Linen Trousers', '3290.00', 1, 'M', '2026-02-23 20:19:27');
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `price`, `quantity`, `size`, `created_at`) VALUES ('585e23c4-da95-4b7e-af22-7d6af50fae19', 'ccfe4302-7ac9-41c1-975c-face733f232b', '286562b8-4b3b-494e-b06f-f263fe32070a', 'Sage Green Embroidered Kurta Set', '3640.00', 1, 'M', '2026-02-25 19:12:03');
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `price`, `quantity`, `size`, `created_at`) VALUES ('e3adf25d-1c55-4731-a3ec-e27efdb4accd', 'b5b0cf4a-ba7e-4072-a0bf-934ddd73e2b8', '67acb201-8dcc-46d3-a746-b76300d5520d', 'Coral Pink Casual Top', '1990.00', 1, 'M', '2026-02-23 20:19:27');

CREATE TABLE `cart_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int DEFAULT '1',
  `size` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `size`, `created_at`) VALUES ('7a30354b-adea-45d5-83bb-f118504d05be', '55df9d2b-8bdc-4a86-869b-202348f369ba', '286562b8-4b3b-494e-b06f-f263fe32070a', 1, 'M', '2026-02-25 19:11:43');

CREATE TABLE `wishlist_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
