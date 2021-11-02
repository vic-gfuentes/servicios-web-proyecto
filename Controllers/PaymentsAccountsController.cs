using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsAccountsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentsAccountsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<PaymentsAccountsController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.PaymentsAccounts.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<PaymentsAccountsController>/5
        [HttpGet("{id}", Name = "GetPaymentsAccount")]
        public ActionResult Get(int id)
        {
            try
            {
                var paymentsAccount = _context.PaymentsAccounts.First(ct => ct.PaymentsAccountId == id);
                return Ok(paymentsAccount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<PaymentsAccountsController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] PaymentsAccount paymentsAccount, [FromRoute] string prefix = "CT")
        {
            try
            {
                //var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);
                //paymentsAccount.PaymentsAccountId = consecutive.GetConsecutiveCode();
                _context.PaymentsAccounts.Add(paymentsAccount);
                _context.SaveChanges();
                return CreatedAtRoute("GetPaymentsAccount", new { id = paymentsAccount.PaymentsAccountId }, paymentsAccount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<PaymentsAccountsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PaymentsAccount paymentsAccount)
        {
            try
            {
                if (paymentsAccount.PaymentsAccountId == id)
                {
                    _context.Entry(paymentsAccount).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetPaymentsAccount", new { id = paymentsAccount.PaymentsAccountId }, paymentsAccount);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<PaymentsAccountsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var paymentsAccount = _context.PaymentsAccounts.First(ct => ct.PaymentsAccountId == id);
                if (paymentsAccount != null)
                {
                    _context.PaymentsAccounts.Remove(paymentsAccount);
                    _context.SaveChanges();
                    return Ok(paymentsAccount);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
