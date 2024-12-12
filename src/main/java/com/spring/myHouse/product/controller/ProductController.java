package com.spring.myHouse.product.controller;

import com.spring.myHouse.contest.entity.Contestjoin;
import com.spring.myHouse.inventory.repository.InventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.myHouse.product.entity.Product;
import com.spring.myHouse.product.repository.ProductRepository;
import com.spring.myHouse.product.service.ProductService;
import com.spring.myHouse.store.entity.Store;
import com.spring.myHouse.store.service.StoreService;
import com.spring.myHouse.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000") // React 서버 주소
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final JdbcTemplate jdbcTemplate;
    private final StoreService storeService;
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;

    // 특정 카테고리에 속한 상품 목록 조회
    @GetMapping("/category/{categorynum}")
    public List<Product> getProductsByCategory(@PathVariable Long categorynum) {
        System.out.println("Fetching products for category: " + categorynum); // 로그 추가
        return productService.getProductsByCategory(categorynum);
    }

    @GetMapping("/category/{categorynum}/store/{storenum}")
    public List<Product> getProductsByCategoryAndStore(
            @PathVariable Long categorynum,
            @PathVariable Long storenum) {
        System.out.println("Fetching products for category: " + categorynum + ", store: " + storenum);
        return productService.getProductsByCategoryAndStore(categorynum, storenum);
    }

    @GetMapping("/productList")
    public List<Product> getProductsByStore(@RequestParam Long storenum) {
        System.out.println("Fetching products by store : " + storenum);
        return productService.getProductsByStore(storenum);
    }

    @GetMapping("/productCount")
    public Long getProductCount(@RequestParam Long storenum){
        System.out.println("Fetching products by store : " + storenum);
        return productService.getProductCountByStore(storenum);
    }

    @GetMapping("/productslist")
    public List<Map<String, Object>> getProducts(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "8") int limit) {
        // 페이지와 제한 개수로 계산된 OFFSET
        int offset = (page - 1) * limit;

        // LIMIT과 OFFSET을 사용한 쿼리
        String query = "SELECT p.productnum, p.productmainimage, p.productname, p.productprice, s.storename " +
                "FROM product p " +
                "JOIN store s ON p.storenum = s.storenum " +
                "LIMIT ? OFFSET ?"; // LIMIT과 OFFSET 사용;



        // 쿼리 파라미터로 limit과 offset을 넘겨서 처리
        return jdbcTemplate.query(query, new Object[]{limit, offset}, (rs, rowNum) -> {
            Map<String, Object> result = new HashMap<>();
            result.put("productNum", Integer.parseInt(rs.getString("productnum")));
            result.put("productMainImage", rs.getString("productmainimage"));
            result.put("productName", rs.getString("productname"));
            result.put("productPrice", rs.getInt("productprice"));
            result.put("storeName", rs.getString("storename"));
            return result;
        });
    }

    @GetMapping("/productDetail")
    public Map<String, Object> getProductDetail(@RequestParam Long productnum) {
        Product product = productService.getProductByProductnum(productnum);
        Map<String, Object> productWithStore = new HashMap<>();
        productWithStore.put("productnum", product.getProductnum());
        productWithStore.put("productname", product.getProductname());
        productWithStore.put("productprice", Integer.parseInt(product.getProductprice()));
        productWithStore.put("productmainimage", product.getProductmainimage());

        Store store = storeService.getStoreByStorenum(product.getStorenum());
        productWithStore.put("storename", store.getStorename());

        int inventoryCount = inventoryRepository.getProductInventoryCount(productnum);
        productWithStore.put("inventorycount", inventoryCount);

        return productWithStore;
    }

    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public String addProduct(
            @RequestPart("product") String productJson,
            @RequestPart("image") MultipartFile imageFile,
            @RequestPart("storenum") String storenum,
            @RequestPart("categorynum") String categorynum) { // categorynum 추가

        ObjectMapper mapper = new ObjectMapper();
        Product product;

        try {
            product = mapper.readValue(productJson, Product.class);

            // Category 객체 생성 및 categorynum 매핑
            com.spring.myHouse.category.entity.Category category = new com.spring.myHouse.category.entity.Category();
            category.setCategorynum(Integer.parseInt(categorynum)); // Long 값을 Integer로 변환
            product.setCategory(category);

            // 이미지 저장 처리
            String imagePath = saveFile(imageFile);
            if (imagePath != null) {
                product.setProductmainimage(imagePath);
            }

            product.setStorenum(Long.parseLong(storenum));

            // DB 저장
            productRepository.save(product);

        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save product: " + e.getMessage();
        }

        return "Product added successfully";
    }

    private String saveFile(MultipartFile imageFile) throws IOException {
        // 디렉터리 경로를 원하는 경로로 지정
        String uploadDir = "C:\\spring_project\\src\\main\\front\\public\\productImg\\";
        File dir = new File(uploadDir);

        // 디렉터리가 존재하지 않으면 생성
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = imageFile.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf("."));
        String newFileName = UUID.randomUUID() + extension;
        String filePath = uploadDir + fileName;

        // 파일 저장
        imageFile.transferTo(new File(filePath));

        // 브라우저에서 접근 가능한 URL 경로를 반환
        return fileName;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProduct(
            @RequestParam("productnum") Long productnum,
            @RequestParam("storenum") Long storenum
    ) {
        try {
            // 존재 여부 확인
            if (!productRepository.existsById(productnum)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 상품이 존재하지 않습니다.");
            }

            productRepository.deleteById(productnum); // 삭제
            return ResponseEntity.ok("상품 삭제 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 삭제 실패");
        }
    }

    @PutMapping(value = "/update", consumes = {"multipart/form-data"})
    public String updateProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile,
            @RequestPart("storenum") String storenum,
            @RequestPart("categorynum") String categorynum) {

        System.out.println("Received imageFile: " + (imageFile != null ? imageFile.getOriginalFilename() : "No file"));

        ObjectMapper mapper = new ObjectMapper();
        Product product;

        try {
            // JSON에서 Product 객체로 변환
            product = mapper.readValue(productJson, Product.class);

            // 카테고리 객체 설정
            com.spring.myHouse.category.entity.Category category = new com.spring.myHouse.category.entity.Category();
            category.setCategorynum(Integer.parseInt(categorynum));
            product.setCategory(category);

            // 이미지 파일이 비어 있지 않다면 저장
            if (imageFile != null && !imageFile.isEmpty()) {
                String imagePath = saveFile(imageFile);
                product.setProductmainimage(imagePath);
            } else {
                // 기존 이미지 유지
                Product existingProduct = productRepository.findById(product.getProductnum())
                        .orElseThrow(() -> new RuntimeException("Product not found"));
                product.setProductmainimage(existingProduct.getProductmainimage());
            }

            // StoreNum 설정
            product.setStorenum(Long.parseLong(storenum));

            // DB 업데이트
            productRepository.save(product);

        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to update product: " + e.getMessage();
        }

        return "Product updated successfully";
    }


    @GetMapping("/search")
    public List<Product> getProductsByQuery(@RequestParam String productname) {
        return productService.searchProducts(productname);
    }

    // 모든 제품을 반환하는 엔드포인트
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
}