package com.example.be4healthynutrium.security;


import com.example.be4healthynutrium.constant.RoleConstant;
import com.example.be4healthynutrium.filter.CustomAuthenticationFilter;
import com.example.be4healthynutrium.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/login");
        http.csrf().disable();
        String user = RoleConstant.USER;
        String admin = RoleConstant.ADMIN;
        String nutrient = RoleConstant.NUTRIENT_EXPERT;
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                // user funcs authorization
                .antMatchers(HttpMethod.GET, "/user").hasAnyAuthority(admin)
                .antMatchers(HttpMethod.POST, "/user/nutrient-expert", "/user/*/delete", "/user/search/*").hasAnyAuthority(admin)
                //  nutrient funcs authorization
                .antMatchers(HttpMethod.POST, "/food", "/food/search", "/food/*/changeStatus", "/category", "/ingredient", "/ingredient/*/changeStatus").hasAnyAuthority(nutrient)
                .antMatchers(HttpMethod.POST, "/food/search-active", "/ingredient/search-active").hasAnyAuthority(nutrient, user)
                // diet funcs authorization
                .antMatchers(HttpMethod.GET, "/diet/**").hasAnyAuthority(user)
                .antMatchers(HttpMethod.POST, "/diet/**").hasAnyAuthority(user)
                // permit all other requests
                .anyRequest().permitAll();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
