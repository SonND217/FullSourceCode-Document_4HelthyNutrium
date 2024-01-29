package com.example.be4healthynutrium.service;

import com.example.be4healthynutrium.domain.*;
import com.example.be4healthynutrium.dto.Diet;
import com.example.be4healthynutrium.dto.DietaryInfoDTO;
import com.example.be4healthynutrium.dto.FoodMass;
import com.example.be4healthynutrium.dto.QuizDTO;
import com.example.be4healthynutrium.exception.CustomException;
import com.example.be4healthynutrium.generator.Generator;
import com.example.be4healthynutrium.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.math3.linear.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class DietaryInfoService {
    @Autowired
    DietaryInfoRepo dietaryInfoRepo;

    @Autowired
    MealRepo mealRepo;

    @Autowired
    SeasonRepo seasonRepo;

    @Autowired
    FoodRepo foodRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    TabooFoodRepo tabooFoodRepo;

    @Autowired
    RecommendationRepo recommendationRepo;

    public DietaryInfoDTO getByUserID(long uid) {

        List<DietaryInfo> dietaryInfos = dietaryInfoRepo.getByUserId(uid);
        if(dietaryInfos.isEmpty()){
            throw new CustomException("Bạn chưa có thực đơn được lưu");
        }

        User user = userRepo.findById(uid).get();

        DietaryInfo breakfast = null;
        DietaryInfo lunch = null;
        DietaryInfo dinner = null;
        DietaryInfo di = dietaryInfos.get(0);

        List<FoodMass> breakfastFoodMasses = new ArrayList<>();
        List<FoodMass> lunchFoodMasses = new ArrayList<>();
        List<FoodMass> dinnerFoodMasses = new ArrayList<>();

        double totalCalo = 0;
        double totalExpectedCalo = 0;

        for (DietaryInfo d : dietaryInfos) {
            // đồ ăn sáng
            if (d.getMeal().getId() == 1) {
                if (breakfast == null) {
                    breakfast = d;
                }
                breakfastFoodMasses.add(new FoodMass(d.getFood(), d.getMass()));
            }
            // đồ ăn trưa
            if (d.getMeal().getId() == 2) {
                if (lunch == null) {
                    lunch = d;
                }
                lunchFoodMasses.add(new FoodMass(d.getFood(), d.getMass()));
            }
            // đồ ăn tối
            if (d.getMeal().getId() == 3) {
                if (dinner == null) {
                    dinner = d;
                }
                dinnerFoodMasses.add(new FoodMass(d.getFood(), d.getMass()));
            }
            totalCalo += d.getFood().getCalo()*d.getMass();
        }

        DietaryInfoDTO diet = new DietaryInfoDTO();

        if (breakfast != null) {
            diet.setBreakfastCalo(breakfast.getCaloriesNeed());
            diet.setBreakfastCarb(breakfast.getCarbNeed());
            diet.setBreakfastFat(breakfast.getFatNeed());
            diet.setBreakfastProtein(breakfast.getProteinNeed());
            totalExpectedCalo += breakfast.getCaloriesNeed();
        }
        if (lunch != null) {
            diet.setLunchCalo(lunch.getCaloriesNeed());
            diet.setLunchCarb(lunch.getCarbNeed());
            diet.setLunchFat(lunch.getFatNeed());
            diet.setLunchProtein(lunch.getProteinNeed());
            totalExpectedCalo += lunch.getCaloriesNeed();
        }
        if (dinner != null) {
            diet.setDinnerCalo(dinner.getCaloriesNeed());
            diet.setDinnerCarb(dinner.getCarbNeed());
            diet.setDinnerFat(dinner.getFatNeed());
            diet.setDinnerProtein(dinner.getProteinNeed());
            totalExpectedCalo += dinner.getCaloriesNeed();
        }

        diet.setUser(user);
        diet.setJob(di.getJob());
        diet.setWeight(di.getWeight());
        diet.setHeight(di.getHeight());
        diet.setDate(di.getDietDate());
        diet.setBmi((di.getWeight() / (Math.pow(di.getHeight(), 2))) * 10000);
        diet.setAge(di.getAge());
        diet.setBreakfast(breakfastFoodMasses);
        diet.setLunch(lunchFoodMasses);
        diet.setDinner(dinnerFoodMasses);
        diet.setTotalCalo(totalCalo);
        diet.setTotalExpectedCalo(totalExpectedCalo);

        if (!diet.getBreakfast().isEmpty() && !diet.getLunch().isEmpty() && !diet.getDinner().isEmpty()) {
            Recommendation recommendation = recommendationRepo.getByAgeAndGender(diet.getAge(), diet.getUser().getGender());
            if (recommendation != null)
                diet.setRecommendation(recommendation);
        }

        return diet;
    }

    public List<DietaryInfo> getAll() {
        return dietaryInfoRepo.findAll();
    }

    public void saveDiet(DietaryInfoDTO dto) {

        if(dto.getBreakfast().isEmpty() && dto.getLunch().isEmpty() && dto.getDinner().isEmpty()){
            throw new CustomException("Không có thực đơn để lưu");
        }

        // get user age
        LocalDate dob = LocalDate.parse(dto.getUser().getDob());
        LocalDate curDate = LocalDate.now();
        int age = Period.between(dob, curDate).getYears();

        String date = dto.getDate();

        if(!dietaryInfoRepo.getByDateAndUser(dto.getUser().getId(),date).isEmpty()){
            throw new CustomException("Trùng thực đơn. Lưu không thành công");
        }

        if (dto.getBreakfast() != null && !dto.getBreakfast().isEmpty()) {
            Meal breakfastMeal = mealRepo.findById((long) 1).get();
            for (FoodMass fm : dto.getBreakfast()) {
                dietaryInfoRepo.save(new DietaryInfo(null, dto.getWeight(), dto.getHeight(), dto.getBreakfastCalo(), dto.getBreakfastFat(), dto.getBreakfastCarb(), dto.getBreakfastProtein(), date, dto.getUser(), dto.getJob(), breakfastMeal, fm.getFood(), fm.getMass(), age));
            }
        }

        if (dto.getLunch() != null && !dto.getLunch().isEmpty()) {
            Meal lunchMeal = mealRepo.findById((long) 2).get();
            for (FoodMass fm : dto.getLunch()) {
                dietaryInfoRepo.save(new DietaryInfo(null, dto.getWeight(), dto.getHeight(), dto.getLunchCalo(), dto.getLunchFat(), dto.getLunchCarb(), dto.getLunchProtein(), date, dto.getUser(), dto.getJob(), lunchMeal, fm.getFood(), fm.getMass(), age));
            }
        }

        if (dto.getDinner() != null && !dto.getDinner().isEmpty()) {
            Meal dinnerMeal = mealRepo.findById((long) 3).get();
            for (FoodMass fm : dto.getDinner()) {
                dietaryInfoRepo.save(new DietaryInfo(null, dto.getWeight(), dto.getHeight(), dto.getDinnerCalo(), dto.getDinnerFat(), dto.getDinnerCarb(), dto.getDinnerProtein(), date, dto.getUser(), dto.getJob(), dinnerMeal, fm.getFood(), fm.getMass(), age));
            }
        }
    }

    public Diet getDiet(QuizDTO quizDTO) {

        // get data from client
        User user = quizDTO.getUser();
        if (user == null) {
            throw new CustomException("Can not find user");
        }
        double weight = quizDTO.getWeight();
        double height = quizDTO.getHeight();
        int breakfastCount = quizDTO.getCounts().get(0);
        int lunchCount = quizDTO.getCounts().get(1);
        int dinnerCount = quizDTO.getCounts().get(2);
        List<Category> selectedCategories = quizDTO.getCategories();
        Job job = quizDTO.getJob();

        // get user age
        LocalDate dob = LocalDate.parse(user.getDob());
        LocalDate curDate = LocalDate.now();
        int age = Period.between(dob, curDate).getYears();

        if (age < job.getMinAge() || age > job.getMaxAge()) {
            throw new CustomException("Nghề " + job.getJobName() + " giới hạn trong độ tuổi " + job.getMinAge() + "-" + job.getMaxAge() + ". Bạn " + age + " tuổi không phù hợp. Vui lòng cập nhật nghề/ngày sinh của bạn");
        }

        // get BMI
        double bmi = 0;
        bmi = weight / Math.pow(height, 2);

        long basicMetabolicEnergy = 0;
        double coefficientMotion = 0;

        // get Coefficient Motion by age + gender
        for (CoefficientMotion c : job.getCoefficientMotions()) {
            if (age >= c.getAgeMin() && age <= c.getAgeMax() && user.getGender() == c.isGender()) {
                coefficientMotion = c.getCoefficientMotion();
                break;
            }
        }

        if (coefficientMotion == 0) {
            throw new CustomException("Độ tuổi của bạn là " + age + ". Không phù hợp với nghề " + job.getJobName() + "(" + job.getMinAge() + " - " + job.getMaxAge() + ") Vui lòng cập nhật nghề hoặc ngày sinh của bạn");
        }

        // get Basic Metabolic Energy by gender
        if (user.getGender()) {
            basicMetabolicEnergy = (long) (66.5 + 13.8 * weight + 5 * height - 6.8 * age);
        } else {
            basicMetabolicEnergy = (long) (655.1 + 9.6 * weight + 1.9 * height - 4.7 * age);
        }

        // get calories
        double caloPerDay = Math.floor(basicMetabolicEnergy * coefficientMotion);
        double breakfastCalories;
        double lunchCalories;
        double dinnerCalories;

        breakfastCalories = Math.floor(caloPerDay * job.getBreakfastRate());
        lunchCalories = Math.floor(caloPerDay * job.getLunchRate());
        dinnerCalories = Math.floor(caloPerDay * job.getDinnerRate());

        // get carbs
        double carbPerDay = Math.floor((caloPerDay * 0.6) / 4);
        double breakfastCarbs = Math.floor(carbPerDay * job.getBreakfastRate());
        double lunchCarbs = Math.floor(carbPerDay * job.getLunchRate());
        double dinnerCarbs = Math.floor(carbPerDay * job.getDinnerRate());
        // get proteins
        double proteinPerDay = Math.floor((caloPerDay * 0.17) / 4);
        double breakfastProteins = Math.floor(proteinPerDay * job.getBreakfastRate());
        double lunchProteins = Math.floor(proteinPerDay * job.getLunchRate());
        double dinnerProteins = Math.floor(proteinPerDay * job.getDinnerRate());
        // get fats
        double fatPerDay = Math.floor((caloPerDay * 0.23) / 9);
        double breakfastFats = Math.floor(fatPerDay * job.getBreakfastRate());
        double lunchFats = Math.floor(fatPerDay * job.getLunchRate());
        double dinnerFats = Math.floor(fatPerDay * job.getDinnerRate());

        // get current season
        Season season;
        Date toDay = new Date();
        if (toDay.getMonth() >= 1 && toDay.getMonth() <= 3) {
            season = seasonRepo.findById((long) 1).get();
        } else if (toDay.getMonth() > 3 && toDay.getMonth() <= 6) {
            season = seasonRepo.findById((long) 2).get();
        } else if (toDay.getMonth() > 6 && toDay.getMonth() <= 9) {
            season = seasonRepo.findById((long) 3).get();
        } else {
            season = seasonRepo.findById((long) 4).get();
        }

        // ---------------- Get Diet -----------------------------------
        List<Food> allFoods = foodRepo.findAll();

        List<Food> breakfastAvailableFoods = new ArrayList<>();
        List<Food> lunchAvailableFoods = new ArrayList<>();
        List<Food> dinnerAvailableFoods = new ArrayList<>();

        Meal breakfastMeal = mealRepo.findById((long) 1).get();
        Meal lunchMeal = mealRepo.findById((long) 2).get();
        Meal dinnerMeal = mealRepo.findById((long) 3).get();

        // get available foods for 3 meals
        for (Food f : allFoods) {
            if (selectedCategories.contains(f.getCategory()) && f.getMeals().contains(breakfastMeal)) {
                breakfastAvailableFoods.add(f);
            }
            if (selectedCategories.contains(f.getCategory()) && f.getMeals().contains(lunchMeal) && f.getSeasons().contains(season)) {
                lunchAvailableFoods.add(f);
            }
            if (selectedCategories.contains(f.getCategory()) && f.getMeals().contains(dinnerMeal) && f.getSeasons().contains(season)) {
                dinnerAvailableFoods.add(f);
            }
        }

        System.out.println("======================================== Breakfast ==========================================");
        List<List<FoodMass>> breakfastOptions = getOptions(breakfastAvailableFoods, breakfastCount, breakfastCalories, breakfastCarbs, breakfastFats, breakfastProteins);

        System.out.println("======================================== Lunch =============================================");
        List<List<FoodMass>> lunchOptions = getOptions(lunchAvailableFoods, lunchCount, lunchCalories, lunchCarbs, lunchFats, lunchProteins);

        System.out.println("======================================== Dinner =============================================");
        List<List<FoodMass>> dinnerOptions = getOptions(dinnerAvailableFoods, dinnerCount, dinnerCalories, dinnerCarbs, dinnerFats, dinnerProteins);

        Diet diet = new Diet();

        diet.setUser(user);
        diet.setHeight(height);
        diet.setWeight(weight);
        diet.setJob(job);
        diet.setBMI(bmi);
        diet.setAge(age);

        diet.setBreakfastOptions(breakfastOptions);
        diet.setLunchOptions(lunchOptions);
        diet.setDinnerOptions(dinnerOptions);

        diet.setBreakfastCalo(breakfastCalories);
        diet.setBreakfastCarb(breakfastCarbs);
        diet.setBreakfastProtein(breakfastProteins);
        diet.setBreakfastFat(breakfastFats);

        diet.setLunchCalo(lunchCalories);
        diet.setLunchCarb(lunchCarbs);
        diet.setLunchProtein(lunchProteins);
        diet.setLunchFat(lunchFats);

        diet.setDinnerCalo(dinnerCalories);
        diet.setDinnerCarb(dinnerCarbs);
        diet.setDinnerProtein(dinnerProteins);
        diet.setDinnerFat(dinnerFats);

        return diet;
    }

    public List<List<FoodMass>> getOptions(List<Food> availableFoods, int foodTotal, double calories, double carbs, double fats, double proteins) {
        List<List<FoodMass>> result = new ArrayList<>();
        Generator.combination(availableFoods).simple(foodTotal).stream().forEach(foodList -> {
            List<FoodMass> option = getOption(foodList, calories, carbs, fats, proteins);
            if (option != null) result.add(option);
        });
        return result;
    }

    public List<FoodMass> getOption(List<Food> foodList, double expectedCalories, double expectedCarbs, double expectedFats, double expectedProteins) {

        try {
            int totalFood = foodList.size();
//            List<String> categories1 = new ArrayList<>(Arrays.asList(new String[]{"cơm", "phở", "miến", "bánh"}));
//            List<String> categories2 = new ArrayList<>(Arrays.asList(new String[]{"thịt", "hải sản", "trứng"}));
//            List<String> categories3 = new ArrayList<>(Arrays.asList(new String[]{"canh", "hoa quả", "rau", "súp", "đậu", "sữa", "rượu", ""}));
//            boolean checkCategories1 = false;
//            boolean checkCategories2 = false;
//            boolean checkCategories3 = false;
//            boolean hasVegetable = false;

            // check dublicate food category
            for (int i = 0; i < totalFood; i++) {
                Food f = foodList.get(i);
                for (int j = i + 1; j < totalFood; j++) {
                    Food f2 = foodList.get(j);
                    if (f.getCategory().getId() == f2.getCategory().getId()) {
                        return null;
                    }
                }
            }

            double[][] array = new double[4][totalFood];

            for (int columnIndex = 0; columnIndex < totalFood; columnIndex++) {
                Food f = foodList.get(columnIndex);
                array[0][columnIndex] = f.getCalo();
                array[1][columnIndex] = f.getCarb();
                array[2][columnIndex] = f.getFat();
                array[3][columnIndex] = f.getProtein();
            }

            // solve matrix
            RealMatrix matrix = new Array2DRowRealMatrix(array, false);
            DecompositionSolver solver = new QRDecomposition(matrix).getSolver();
            RealVector constants = new ArrayRealVector(new double[]{expectedCalories, expectedCarbs, expectedFats, expectedProteins}, false);
            RealVector solution = solver.solve(constants);

            // get masses (means)
            double[] masses = ((ArrayRealVector) solution).getDataRef();
            double calories = 0;
            double carbs = 0;
            double fats = 0;
            double proteins = 0;

            // Check all mass
            for (int i = 0; i < masses.length; i++) {

                masses[i] = Math.round(masses[i] * 2) / 2.0;

                if (masses[i] <= 0 && masses[i] >= -1) {
                    masses[i] = 0.5;
                } else if (masses[i] < -1) {
                    return null;
                }

                Food food = foodList.get(i);
                double mass = masses[i];

                calories += mass * food.getCalo();
                carbs += mass * food.getCarb();
                fats += mass * food.getFat();
                proteins += mass * food.getProtein();
            }

            // check expected values
            if (Math.abs(calories - expectedCalories) <= 50 && Math.abs(carbs - expectedCarbs) <= 10 && Math.abs(fats - expectedFats) <= 10 && Math.abs(proteins - expectedProteins) <= 10) {

                List<FoodMass> foodMasses = new ArrayList<>();
                int count = 0;

                boolean hasRice = false;
                boolean hasNoodle = false;
                boolean hasRiceNoodle = false;
                boolean porridge = false;

                for (Food food : foodList) {
                    if (food.getCategory().getCategoryName().equalsIgnoreCase("Cơm")) {
                        if (hasRice || hasRiceNoodle || hasNoodle || porridge) {
                            return null;
                        }
                        hasRice = true;
                    }
                    if (food.getCategory().getCategoryName().equalsIgnoreCase("Cháo")) {
                        if (hasRice || hasRiceNoodle || hasNoodle || porridge) {
                            return null;
                        }
                        porridge = true;
                    }
                    if (food.getCategory().getCategoryName().equalsIgnoreCase("Miến")) {
                        if (hasRice || hasRiceNoodle || hasNoodle || porridge) {
                            return null;
                        }
                        hasRiceNoodle = true;
                    }
                    if (food.getCategory().getCategoryName().equalsIgnoreCase("Phở")) {
                        if (hasRice || hasRiceNoodle || hasNoodle || porridge) {
                            return null;
                        }
                        hasNoodle = true;
                    }
                    System.out.println("(" + masses[count] + ") " + food.getFoodName() + ", calo: " + food.getCalo() + ", carb: " + food.getCarb() + ", fat: " + food.getFat() + ", proteins: " + food.getProtein());
                    foodMasses.add(new FoodMass(food, masses[count]));
                    count++;
                }

                System.out.println("Expected-calo = " + expectedCalories + " => " + calories + "\nExpected-carb = " + expectedCarbs + " => " + carbs + "\nExpected-fat = " + expectedFats + " => " + fats + "\nExpected-proteins = " + expectedProteins + " => " + proteins + "\n-------------------------------------------------------------------------");
                return foodMasses;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

}
