-- Rangla Charkha DB Backup - 2026-02-25T19:15:16.162Z
-- Database: rangla_charkha

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES ('rangla-charkha-cache-livewire-rate-limiter:16d36dff9abd246c67dfac3e63b993a169af77e6', 'i:1;', 1771630217);
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES ('rangla-charkha-cache-livewire-rate-limiter:16d36dff9abd246c67dfac3e63b993a169af77e6:timer', 'i:1771630217;', 1771630217);

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `cache_locks` is empty

DROP TABLE IF EXISTS `cart_items`;
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

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES (1, 'Dupattas', 'dupattas', 'Elegant dupattas for every occasion', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600', 1, 1, '2026-02-20 18:42:15', '2026-02-20 19:17:51');
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES (2, 'Kurtas', 'kurtas', 'Comfortable and stylish kurtas', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', 1, 2, '2026-02-20 18:42:15', '2026-02-20 19:17:51');
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES (3, 'Shalwar Kameez', 'shalwar-kameez', 'Traditional and modern sets', 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600', 1, 3, '2026-02-20 18:42:15', '2026-02-20 19:17:51');
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES (4, 'Accessories', 'accessories', 'Bags, jewellery and more', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', 1, 4, '2026-02-20 18:42:15', '2026-02-20 19:17:51');

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `failed_jobs` is empty

DROP TABLE IF EXISTS `foo_test`;
CREATE TABLE `foo_test` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `foo_test` is empty

DROP TABLE IF EXISTS `hero_slides`;
CREATE TABLE `hero_slides` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `button_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Shop Now',
  `button_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hero_slides_product_id_foreign` (`product_id`),
  CONSTRAINT `hero_slides_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `hero_slides` is empty

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `job_batches` is empty

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `jobs` is empty

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4, '2026_02_20_220305_create_categories_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5, '2026_02_20_220307_create_products_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6, '2026_02_20_220308_create_orders_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7, '2026_02_20_220309_create_order_items_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8, '2026_02_20_220310_create_wishlist_items_table', 1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9, '2026_02_20_220407_create_hero_slides_table', 1);

DROP TABLE IF EXISTS `order_items`;
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

DROP TABLE IF EXISTS `orders`;
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

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `password_reset_tokens` is empty

DROP TABLE IF EXISTS `product`;
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

INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('1a063410-0670-4853-8251-0efe06b1ad3d', 'Baby Pink Lace Trim Kurta Set', '7490.00', 'lawn', 'Soft baby pink two-piece set with delicate white lace and pearl embellishments. Round neck, full sleeves with floral embroidery and scalloped lace cuffs. Matching straight trousers.', '/products/pink-kurta-lace.png', 1, 'S,M,L,XL', '2026-02-23 19:55:04', '2026-02-23 19:55:04', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('286562b8-4b3b-494e-b06f-f263fe32070a', 'Sage Green Embroidered Kurta Set', '3640.00', 'lawn', 'Light sage green kurta with floral embroidery in pink, coral and yellow. Boat neck with tassels. Matching trousers.', '/products/sage-green-embroidered-kurta.png', 1, 'S,M,L,XL', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '5200.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('2b866221-e47e-4ed4-8ce0-8c1bfc9ad1a1', 'Maroon Gold Embroidered Kurta Set', '3640.00', 'lawn', 'Deep maroon kurta with rich golden embroidery on neckline, cuffs and hem. Matching trousers. Elegant for Eid and festivities.', '/products/maroon-gold-embroidery-kurta.png', 1, 'S,M,L,XL', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '5200.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('468d73b1-cc40-4b86-ac28-b7f7b4136ecb', 'Mustard Yellow Lace Trim Kurta Set', '3360.00', 'lawn', 'Vibrant mustard yellow kurta set with white lace on cuffs and hem. V-neck with subtle embroidery. Matching straight trousers. Eid special.', '/products/mustard-lace-kurta.png', 1, 'S,M,L,XL', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '4800.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('67acb201-8dcc-46d3-a746-b76300d5520d', 'Coral Pink Casual Top', '1990.00', 'casual', 'Solid coral pink casual top. Round neck, short sleeves. Light cotton blend for daily wear.', '/products/coral-pink-casual-top.png', 1, 'S,M,L,XL', '2026-02-23 19:55:04', '2026-02-23 20:04:07', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('8990eca3-0bc1-4a30-a54c-8f09743919c4', 'Light Pink Dupatta Kurta Set', '3150.00', 'lawn', 'Pastel pink three-piece with sheer dupatta. V-neck with pearl and lace trim. Floral embroidery on hem. Eid special.', '/products/pink-dupatta-kurta.png', 1, 'S,M,L,XL', '2026-02-25 19:06:43', '2026-02-25 19:06:43', '4500.00');
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('b0faaada-0431-4aa2-88eb-e002dda31932', 'Black Casual Cotton Shirt', '2490.00', 'casual', 'Comfortable black cotton shirt for casual wear. Relaxed fit, full sleeves. Versatile for office or weekend.', '/products/black-casual-shirt.png', 1, 'S,M,L,XL', '2026-02-23 19:55:04', '2026-02-23 20:04:07', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('b6f6c170-c379-49ce-99b3-1e2d134ed12d', 'Sage Green Embroidered Kurta Set', '8290.00', 'lawn', 'Pastel sage green kurta with rich floral embroidery in pink, peach, orange and yellow on yoke, cuffs and hem. Round neck with small V-slit and decorative tassels. Straight-cut trousers.', '/products/green-kurta-embroidered.png', 1, 'S,M,L,XL', '2026-02-23 19:55:04', '2026-02-23 19:55:04', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('d766b48b-2321-40dd-8fe6-4519c3953c65', 'Maroon Gold Embroidered Kurta Set', '8990.00', 'lawn', 'Elegant maroon kurta set with exquisite gold floral and leaf embroidery. V-neck with heavy embroidery panel, full sleeves with embroidered cuffs. Matching straight trousers. Perfect for festive and semi-formal occasions.', '/products/maroon-kurta-gold-embroidery.png', 1, 'S,M,L,XL', '2026-02-23 19:55:04', '2026-02-23 19:55:04', NULL);
INSERT INTO `product` (`id`, `name`, `price`, `category`, `description`, `image_url`, `in_stock`, `sizes`, `created_at`, `updated_at`, `original_price`) VALUES ('dd9c72f8-a2a1-4b01-bf2b-f47de7619f0f', 'Beige Linen Trousers', '3290.00', 'casual', 'High-waist beige linen trousers. Loose fit, breathable fabric. Pairs well with kurtas or tops.', '/products/beige-linen-trousers.png', 1, 'S,M,XL', '2026-02-23 19:55:04', '2026-02-23 20:04:07', NULL);

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES ('eT7PULjxC88dZuX2raVfL5F3pnMe4cSFsllPyUNa', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUlVQcWd5cFl0Mk5iSUpZU1Q3TjFnYktuNjk4ZzRHck9haWNoNTlhcCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czoyMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1771693421);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES ('fQwHuckkKAa1Nuu3oBy6BETG3SeAfobvj1RBYSMf', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoieUtKT2kyb0laRVRWbVZ2djg1OEdVOU5FNlhWQkJhczVFQWlDUXlvWSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czoxODk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jaGVja291dD9wYXltZW50X2ludGVudD1waV8zVDNIN0lHZTlDeU5mSUJVMXR5T2gzSncmcGF5bWVudF9pbnRlbnRfY2xpZW50X3NlY3JldD1waV8zVDNIN0lHZTlDeU5mSUJVMXR5T2gzSndfc2VjcmV0X0RlZW1lUmhrQzBZSE0zUmxlQUI3RGpRTHImcmVkaXJlY3Rfc3RhdHVzPXN1Y2NlZWRlZCI7czo1OiJyb3V0ZSI7czoxNDoiY2hlY2tvdXQuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjQ6ImNhcnQiO2E6MTp7czo2OiIxNV94X3giO2E6NDp7czoxMDoicHJvZHVjdF9pZCI7aToxNTtzOjg6InF1YW50aXR5IjtpOjE7czo0OiJzaXplIjtOO3M6NToiY29sb3IiO047fX19', 1771684056);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES ('O78fXgI7qRdPd6AeiovRNUBI4kFH4ZjXei5tDSod', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/2.4.31 Chrome/142.0.7444.235 Electron/39.2.7 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOWpqajIyR251eGJkUTlZOVlZcXV0bnVYMGtubGROTmlIUnVPd2lGZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771706186);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES ('ZVQvQwKcW7QPEYuPNvucIKr9doec4IhFn2zvEYN6', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoia0RJNDdXdFNDdlFZVjRmbGdRQThjQ2lQck1NZ2RjUkhYb0FQTmlmSSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czozMjoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2NhdGVnb3JpZXMiO3M6NToicm91dGUiO3M6MTY6ImNhdGVnb3JpZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1771709884);

DROP TABLE IF EXISTS `users`;
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

DROP TABLE IF EXISTS `wishlist_items`;
CREATE TABLE `wishlist_items` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `wishlist_items` is empty

SET FOREIGN_KEY_CHECKS = 1;
